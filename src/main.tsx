import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import { hydrateAuthFromStorage } from "./utils/authStorage";

hydrateAuthFromStorage();

async function startApp(): Promise<void> {
    if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === "true") {
        const { worker } = await import("./mocks/browser");
        await worker.start({ onUnhandledRequest: "bypass" });
    }

    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <Provider store={store}>
            <BrowserRouter>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </BrowserRouter>
        </Provider>
    );
}

void startApp();
