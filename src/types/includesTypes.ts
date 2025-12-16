import React from "react";

export interface customChipConfig {
    overrideClasses: string;
    icon: string;
    progressComplete: any;
    content:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | Iterable<React.ReactNode>
        | null
        | undefined;
}

export interface CustomCircularProgressbarConfig {
    value: string | number;
    text: string | number | null;
}

export interface dropDownConfig {
    clickEvent: (e?: string | null) => void;
    addArchiveButton: boolean;
    archiveButtonText: string;
}

export interface CustomModalConfig {
    isOpen: any;
    isClose: () => void;
    component?: React.ReactElement;
    title: string;
    closeModal: (event: any) => void;
    buttonContent?: string;
}

export interface modalBottomConfig {
    isOpen: boolean;
    isClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
    title:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | Iterable<React.ReactNode>
        | null
        | undefined;
    component:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | Iterable<React.ReactNode>
        | React.ReactPortal
        | Iterable<React.ReactNode>
        | null
        | undefined;
    buttonContent: any;
    isQuillButton: any;
    attributes: { clickEvent: () => void; loader: any; disabled: any };
}
