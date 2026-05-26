import type { AppDispatch } from "../store";
import { userActions } from "../store/slices/userSlice";

interface AuthUser {
    _id: string;
    is_updated: boolean;
    sign_in_method: string;
}

interface AuthResponse {
    token: string;
    user: AuthUser;
}

export function persistAuthSession(
    dispatch: AppDispatch,
    data: AuthResponse
): void {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
        "user",
        JSON.stringify({
            _id: data.user._id,
            is_updated: data.user.is_updated,
            sign_in_method: data.user.sign_in_method,
        })
    );
    dispatch(userActions.userLoggedIn(true));
    dispatch(userActions.userInfo(data.user));
}

export function clearAuthSession(dispatch: AppDispatch): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userActions.clearAuth());
}

export function getApiErrorMessage(error: unknown): string {
    if (
        error != null &&
        typeof error === "object" &&
        "response" in error &&
        (
            error as {
                response?: {
                    data?: { statusCode?: number; message?: string | string[] };
                };
            }
        ).response?.data != null
    ) {
        const { statusCode, message } = (
            error as {
                response: {
                    data: {
                        statusCode?: number;
                        message?: string | string[];
                    };
                };
            }
        ).response.data;
        if (statusCode === 422 || statusCode === 400) {
            if (Array.isArray(message)) {
                return message[0] ?? "An unexpected error occurred.";
            }
            if (message != null) {
                return message;
            }
        }
    }
    return "An unexpected error occurred.";
}
