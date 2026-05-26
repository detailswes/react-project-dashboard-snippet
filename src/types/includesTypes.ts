import type { ReactElement, ReactNode, MouseEventHandler } from "react";

export interface customChipConfig {
    overrideClasses: string;
    icon: string;
    progressComplete: string | number | undefined;
    content: ReactNode;
}

export interface CustomCircularProgressbarConfig {
    value: string | number;
    text: string | number | null;
}

export interface dropDownConfig {
    clickEvent: (e: string) => void;
    addArchiveButton: boolean;
    archiveButtonText: string;
}

export interface CustomModalConfig {
    isOpen: boolean;
    isClose: () => void;
    component?: ReactElement;
    title: string;
    closeModal: () => void;
    buttonContent?: string;
}

export interface modalBottomConfig {
    isOpen: boolean;
    isClose: MouseEventHandler<HTMLButtonElement> | undefined;
    title: string;
    component: ReactElement;
    buttonContent: string;
    isQuillButton: boolean;
    attributes: {
        clickEvent: () => void;
        loader: boolean;
        disabled: boolean;
    };
}
