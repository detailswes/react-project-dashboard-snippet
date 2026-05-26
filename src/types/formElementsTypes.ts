export interface InputFieldConfig {
    value: string | number;
    label: string;
    labelTabIndex?: number;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    error?: string | undefined | null | boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    tabIndex?: number;
    type?: string;
    tooltip?: boolean;
}

export interface RadioFieldConfig {
    value: string | number;
    label: string;
    labelTabIndex?: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    checked?: boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    id: string;
}

export interface TextAreaConfig {
    value: string;
    label: string;
    placeholder: string;
    labelTabIndex?: number | undefined;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string | undefined | null | boolean;
    name: string;
    inputClass?: string;
    labelClass?: string;
    rows?: number;
    toolTipText?: string;
    showTooltip?: boolean;
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
        value?: string;
    };
    classes: string;
}

export interface ButtonAttributesConfig {
    type: "button" | "submit" | "reset" | undefined;
    loader: boolean;
    disabled: boolean | undefined;
    clickEvent: () => void;
    value: string;
    buttonText?: string;
}
