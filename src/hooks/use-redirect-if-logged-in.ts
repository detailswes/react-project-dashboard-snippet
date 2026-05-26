import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";

export function useRedirectIfLoggedIn(): void {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/projects", { replace: true });
        }
    }, [isLoggedIn, navigate]);
}
