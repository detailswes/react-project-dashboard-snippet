import React, { lazy, Suspense, type ReactElement } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

import "./i18n";

const EmailAuth = lazy(async () => await import("./pages/EmailAuth"));
const PhoneAuth = lazy(async () => await import("./pages/PhoneAuth"));
const Projects = lazy(async () => await import("./pages/Projects"));

const NotFound = (): ReactElement => (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            gap: "1rem",
        }}
    >
        <h1>404 — Page Not Found</h1>
        <a href="/auth">Go to sign in</a>
    </div>
);

function App(): JSX.Element {
    return (
        <>
            <Suspense fallback={<div />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<PhoneAuth />} />
                    <Route path="/auth/email" element={<EmailAuth />} />
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <ToastContainer />
        </>
    );
}

export default App;
