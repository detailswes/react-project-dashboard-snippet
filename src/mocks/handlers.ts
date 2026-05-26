import { rest } from "msw";

const mockUser = {
    _id: "mock-user-001",
    is_updated: false,
    sign_in_method: "phone",
    full_name: "Demo User",
};

const mockProjects = [
    {
        slug: "demo-project-1",
        project_name: "Demo Production App",
        project_type: "production",
        project_status: "active",
        project_description: "A sample project for local development",
        requested_by: ["Alice"],
        status: {
            stage: "Design",
            progress_complete: 45,
            design_delivery_date: "2026-06-01",
            design_delivery_date_method: "date",
            expire: false,
            blocked: false,
        },
        is_waiting: null,
    },
    {
        slug: "demo-project-2",
        project_name: "Internal Tools",
        project_type: "internal",
        project_status: "backlog",
        project_description: "",
        requested_by: [],
        status: {},
        is_waiting: null,
    },
];

export const handlers = [
    rest.post("*/auth/request", (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ message: "OTP sent" }))
    ),
    rest.post("*/auth/request/email", (_req, res, ctx) =>
        res(ctx.status(202), ctx.json({ message: "OTP sent" }))
    ),
    rest.post("*/auth/verify", (_req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.json({
                token: "mock-jwt-token",
                user: { ...mockUser, sign_in_method: "phone" },
            })
        )
    ),
    rest.post("*/auth/verify/email", (_req, res, ctx) =>
        res(
            ctx.status(201),
            ctx.json({
                token: "mock-jwt-token",
                user: { ...mockUser, sign_in_method: "email" },
            })
        )
    ),
    rest.get("*/projects/all/active/:userId", (_req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.json(mockProjects.filter((p) => p.project_status === "active"))
        )
    ),
    rest.get("*/projects/all/backlog/:userId", (_req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.json(mockProjects.filter((p) => p.project_status === "backlog"))
        )
    ),
    rest.get("*/projects/all/archive/:userId", (_req, res, ctx) =>
        res(ctx.status(200), ctx.json([]))
    ),
    rest.get("*/users/all", (_req, res, ctx) =>
        res(
            ctx.status(200),
            ctx.json({
                user: [
                    { full_name: "Alice" },
                    { full_name: "Bob" },
                    { full_name: "Charlie" },
                ],
            })
        )
    ),
    rest.post("*/projects/new", (_req, res, ctx) =>
        res(
            ctx.status(201),
            ctx.json({
                slug: "new-demo-project",
                project: {
                    ...mockProjects[0],
                    slug: "new-demo-project",
                    project_name: "New Project",
                },
            })
        )
    ),
];
