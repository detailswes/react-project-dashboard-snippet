export interface ProjectStatus {
    stage?: string;
    progress_complete?: string | number;
    design_delivery_date?: string;
    design_delivery_date_method?: string;
    expire?: boolean;
    blocked?: boolean;
}

export interface Project {
    slug: string;
    project_name: string;
    project_type: "production" | "internal";
    project_status: "active" | "backlog" | "archive";
    project_description: string;
    requested_by: string[];
    status: ProjectStatus | Record<string, never>;
    is_waiting: { status?: boolean } | null;
}

export type TabName = "active" | "backlog" | "archive";

export interface UserOption {
    value: string;
    label: string;
}
