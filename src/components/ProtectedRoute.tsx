import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ProtectedRoute = ({
    children,
}: {
    children: ReactElement;
}): ReactElement => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
