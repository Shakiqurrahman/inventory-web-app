import { useEffect, type ReactNode } from "react";
import { Navigate, useNavigate } from "react-router";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import {
  logoutUser,
  useCurrentToken,
  type TUserData,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
};

const AdminProtected = ({ children }: TProtectedRoute) => {
  const [logoutApi] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  let user: TUserData | null = null;

  if (token) {
    user = verifyToken(token) as TUserData;
  }

  useEffect(() => {
    const handleUnauthorized = async () => {
      if (!token || !user || user.role !== "ADMIN") {
        await logoutApi(null).unwrap();
        dispatch(logoutUser());
        navigate("/login");
      }
    };

    handleUnauthorized();
  }, [user, dispatch, logoutApi, token, navigate]);

  if (!token) {
    dispatch(logoutUser());
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default AdminProtected;
