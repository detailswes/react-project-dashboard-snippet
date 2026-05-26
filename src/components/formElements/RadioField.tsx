import React, { type ReactElement } from "react";

import { type RadioFieldConfig } from "../../types/formElementsTypes";

// interface RadioFieldType {
//     value: any;
//     label: string;
//     labelTabIndex?: number | undefined;
//     onChange: (event: any) => void;
//     onBlur: (event: any) => void;
//     error?: string;
//     checked?: boolean;
//     name: string;
//     inputClass?: string;
//     labelClass?: string;
//     id: string;
// }

const RadioField = ({
    value,
    label,
    labelTabIndex = undefined,
    onChange,
    onBlur,
    error,
    checked = false,
    name,
    inputClass = "hidden peer",
    labelClass = "text-center p-2.5 text-14 font-inter-medium text-capitalize inline-block w-full text-fieldNoFocus rounded border border-fieldOutline cursor-pointer peer-checked:border-blue-600 peer-checked:text-primary hover:border-primary hover:text-primary",
    id,
}: RadioFieldConfig): ReactElement => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(e);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onBlur(e);
    };

    return (
        <>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                className={`${inputClass} ${
                    error != null ? "border-error !bg-white" : ""
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                checked={checked}
            />
            <label htmlFor={id} tabIndex={labelTabIndex} className={labelClass}>
                {label}
            </label>
        </>
    );
};

export default RadioField;
