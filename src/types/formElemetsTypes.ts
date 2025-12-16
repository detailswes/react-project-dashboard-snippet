import React from "react";

export interface InputFieldConfig {
    value: any;
    label: string;
    labelTabIndex?: number;
    placeholder: string;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    error?: string | undefined | null | boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    tabIndex?: number;
    type?: string;
    tooltip?: boolean;
}

export interface RadioFieldConfig {
    value: any;
    label: string;
    labelTabIndex?: number | undefined;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    error?: string;
    checked?: boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    id: string;
}

export interface TextAreaConfig {
    value: any;
    label: string;
    placeholder: string;
    labelTabIndex?: number | undefined;
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    error?: string | undefined | null | boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    rows?: number;
    toolTipText?: string;
}

export interface ButtonConfig {
    attributes: {
        type?: "button" | "submit" | "reset" | undefined;
        loader?: boolean;
        disabled?: boolean | undefined;
        clickEvent?:
            | React.MouseEventHandler<HTMLButtonElement>
            | undefined
            | (() => Promise<void>);
        value?: any;
    };
    classes: string;
}

export interface ButtonAttributesConfig {
    type: "button" | "submit" | "reset" | undefined;
    loader: boolean;
    disabled: boolean | undefined;
    clickEvent: () => void;
    value: any;
    buttonText?: string;
}
