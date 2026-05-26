import store from "../store";
import { userActions } from "../store/slices/userSlice";

export function hydrateAuthFromStorage(): void {
    const token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");
    if (token == null || raw == null) {
        return;
    }
    try {
        const user = JSON.parse(raw) as {
            _id: string;
            is_updated: boolean;
            sign_in_method: string;
        };
        if (user._id.length > 0) {
            store.dispatch(userActions.userLoggedIn(true));
            store.dispatch(userActions.userInfo(user));
        }
    } catch {
        store.dispatch(userActions.clearAuth());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}
