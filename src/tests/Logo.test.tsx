import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "../components/Logo";

describe("Logo", () => {
    it("renders an SVG element", () => {
        const { container } = render(<Logo />);
        expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("uses default width and height of 62x15", () => {
        const { container } = render(<Logo />);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "62");
        expect(svg).toHaveAttribute("height", "15");
    });

    it("accepts custom width and height props", () => {
        const { container } = render(<Logo width={44} height={11} />);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("width", "44");
        expect(svg).toHaveAttribute("height", "11");
    });

    it("renders three paths for the logo shapes", () => {
        const { container } = render(<Logo />);
        const paths = container.querySelectorAll("path");
        expect(paths).toHaveLength(3);
    });
});
