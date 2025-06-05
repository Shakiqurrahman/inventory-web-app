/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import { verifyToken } from "../../utils/verifyToken";
import { logoutUser, setToken } from "../features/auth/authSlice";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${config.api_url}`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("authorization", `${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        //* Send Refresh
        const res = await fetch(`${config.api_url}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        });

        const data = await res.json();

        if (data?.data) {
            const token = data.data;
            const user = verifyToken(token);
            // const user = (api.getState() as RootState).auth.user;

            api.dispatch(
                setToken({
                    user,
                    token,
                })
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutUser());
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
    refetchOnMountOrArgChange: true,
    tagTypes: ["user", "categories", "profile", "expenses"],
    endpoints: () => ({}),
});
