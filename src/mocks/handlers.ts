import { http, HttpResponse } from "msw";

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
    http.post("*/auth/request", () =>
        HttpResponse.json({ message: "OTP sent" }, { status: 200 })
    ),
    http.post("*/auth/request/email", () =>
        HttpResponse.json({ message: "OTP sent" }, { status: 202 })
    ),
    http.post("*/auth/verify", () =>
        HttpResponse.json(
            {
                token: "mock-jwt-token",
                user: { ...mockUser, sign_in_method: "phone" },
            },
            { status: 200 }
        )
    ),
    http.post("*/auth/verify/email", () =>
        HttpResponse.json(
            {
                token: "mock-jwt-token",
                user: { ...mockUser, sign_in_method: "email" },
            },
            { status: 201 }
        )
    ),
    http.get("*/projects/all/active/:userId", () =>
        HttpResponse.json(
            mockProjects.filter((p) => p.project_status === "active"),
            { status: 200 }
        )
    ),
    http.get("*/projects/all/backlog/:userId", () =>
        HttpResponse.json(
            mockProjects.filter((p) => p.project_status === "backlog"),
            { status: 200 }
        )
    ),
    http.get("*/projects/all/archive/:userId", () =>
        HttpResponse.json([], { status: 200 })
    ),
    http.get("*/users/all", () =>
        HttpResponse.json(
            {
                user: [
                    { full_name: "Alice" },
                    { full_name: "Bob" },
                    { full_name: "Charlie" },
                ],
            },
            { status: 200 }
        )
    ),
    http.post("*/projects/new", () =>
        HttpResponse.json(
            {
                slug: "new-demo-project",
                project: {
                    ...mockProjects[0],
                    slug: "new-demo-project",
                    project_name: "New Project",
                },
            },
            { status: 201 }
        )
    ),
];
