import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { describe, it, expect } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import ProtectedRoute from "../components/ProtectedRoute";
import userSlice from "../store/slices/userSlice";

const renderWithRouter = (isLoggedIn: boolean): void => {
    const store = configureStore({
        reducer: { user: userSlice.reducer },
        preloadedState: {
            user: {
                isLoggedIn,
                userInfo: {
                    _id: isLoggedIn ? "user-1" : "",
                    is_updated: false,
                    sign_in_method: "phone",
                },
            },
        },
    });

    render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/projects"]}>
                <Routes>
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <div>Projects Page</div>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/auth" element={<div>Sign In Page</div>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe("ProtectedRoute", () => {
    it("redirects to /auth when user is not logged in", () => {
        renderWithRouter(false);
        expect(screen.getByText("Sign In Page")).toBeInTheDocument();
        expect(screen.queryByText("Projects Page")).not.toBeInTheDocument();
    });

    it("renders children when user is logged in via Redux", () => {
        renderWithRouter(true);
        expect(screen.getByText("Projects Page")).toBeInTheDocument();
        expect(screen.queryByText("Sign In Page")).not.toBeInTheDocument();
    });
});
