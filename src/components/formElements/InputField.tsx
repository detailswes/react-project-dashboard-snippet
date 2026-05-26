import React, { type ReactElement } from "react";
import { type InputFieldConfig } from "../../types/formElementsTypes";
import Tooltip from "../Tooltip";

const InputField = ({
    value,
    label,
    labelTabIndex = undefined,
    placeholder,
    onChange,
    onBlur,
    error,
    name,
    inputClass = "custom-input-field",
    labelClass = "field-label text-left",
    tabIndex = undefined,
    type = "text",
    tooltip = false,
}: InputFieldConfig): ReactElement => {
    const handleChange = (e: any): void => {
        onChange(e);
    };

    const handleBlur = (e: any): void => {
        onBlur(e);
    };

    return (
        <>
            <label className={labelClass} tabIndex={labelTabIndex}>
                {label}
                {tooltip && (
                    <Tooltip
                        tabIndex={5}
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                        icon={undefined}
                        placement={undefined}
                        isLogoutLink={false}
                    />
                )}
            </label>
            <input
                type={type}
                value={value}
                className={`${inputClass} ${
                    // eslint-disable-next-line no-extra-boolean-cast
                    Boolean(error) ? "border-error !bg-white" : "!bg-white"
                }`}
                placeholder={placeholder}
                onBlur={handleBlur}
                onChange={handleChange}
                name={name}
                tabIndex={tabIndex}
            />
        </>
    );
};

export default InputField;
