import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "../components/formElements/Button";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { changeLanguage: vi.fn() },
    }),
}));

describe("Button", () => {
    it("renders button text when loader is false", () => {
        render(
            <Button
                classes="btn"
                attributes={{ value: "Submit", disabled: false, loader: false }}
            />
        );
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("hides text and shows spinner when loader is true", () => {
        const { container } = render(
            <Button
                classes="btn"
                attributes={{ value: "Submit", disabled: false, loader: true }}
            />
        );
        const text = screen.getByText("Submit");
        expect(text).toHaveClass("hidden");
        expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("is disabled when disabled prop is true", () => {
        render(
            <Button
                classes="btn"
                attributes={{ value: "Submit", disabled: true, loader: false }}
            />
        );
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("calls clickEvent when clicked", async () => {
        const user = userEvent.setup();
        const clickHandler = vi.fn();
        render(
            <Button
                classes="btn"
                attributes={{
                    value: "Click me",
                    disabled: false,
                    loader: false,
                    clickEvent: clickHandler,
                }}
            />
        );
        await user.click(screen.getByRole("button"));
        expect(clickHandler).toHaveBeenCalledOnce();
    });
});
