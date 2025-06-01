import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../redux/store";

const ProtectedResetRoute = () => {
    const resetToken = useSelector(
        (state: RootState) => state.resetPassword.resetToken
    );
    return resetToken ? <Outlet /> : <Navigate to="/reset-password/otp" />;
};

export default ProtectedResetRoute;
