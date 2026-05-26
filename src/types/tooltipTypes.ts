type Placement = "top" | "right" | "bottom" | "left";

export interface simpleTooltipConfig {
    content?: string;
    tabIndex?: number;
    icon?: string;
    placement?: Placement;
    active?: boolean;
    isLogoutLink: boolean;
    to?: string;
}
