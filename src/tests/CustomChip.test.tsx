import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CustomChip from "../components/includes/CustomChip";

describe("CustomChip", () => {
    it("renders content text", () => {
        render(
            <CustomChip
                icon="status"
                content="Active"
                overrideClasses=""
                progressComplete={undefined}
            />
        );
        expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders a green circle for status icon", () => {
        const { container } = render(
            <CustomChip
                icon="status"
                content="On track"
                overrideClasses=""
                progressComplete={undefined}
            />
        );
        const circle = container.querySelector("circle");
        expect(circle).toHaveAttribute("fill", "#2AD430");
    });

    it("renders a red circle for blocked icon", () => {
        const { container } = render(
            <CustomChip
                icon="blocked"
                content="Blocked"
                overrideClasses=""
                progressComplete={undefined}
            />
        );
        const circle = container.querySelector("circle");
        expect(circle).toHaveAttribute("fill", "#FF0000");
    });

    it("renders a yellow circle for missing icon", () => {
        const { container } = render(
            <CustomChip
                icon="missing"
                content="Status missing"
                overrideClasses=""
                progressComplete={undefined}
            />
        );
        const circle = container.querySelector("circle");
        expect(circle).toHaveAttribute("fill", "#FECD48");
    });

    it("renders empty string for internal icon", () => {
        const { container } = render(
            <CustomChip
                icon="internal"
                content="Internal"
                overrideClasses=""
                progressComplete={undefined}
            />
        );
        expect(container.querySelector("svg")).not.toBeInTheDocument();
    });

    it("applies overrideClasses to the chip span", () => {
        const { container } = render(
            <CustomChip
                icon="status"
                content="Test"
                overrideClasses="!mx-0"
                progressComplete={undefined}
            />
        );
        expect(container.querySelector("span.chip")).toHaveClass("!mx-0");
    });
});
