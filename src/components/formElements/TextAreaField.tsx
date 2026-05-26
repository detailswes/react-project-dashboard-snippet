import React, { type ReactElement } from "react";
import Tooltip from "../Tooltip";

import { type TextAreaConfig } from "../../types/formElementsTypes";

const TextAreaField = ({
    value,
    label,
    placeholder,
    labelTabIndex = undefined,
    onChange,
    onBlur,
    error,
    name,
    inputClass = "custom-input-field  resize-none",
    labelClass = "field-label text-left",
    rows = 2,
    toolTipText,
    showTooltip = false,
}: TextAreaConfig): ReactElement => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        onChange(e);
    };

    const handleBlur = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        onBlur(e);
    };

    return (
        <>
            {label.length > 0 && (
                <label className={labelClass} tabIndex={labelTabIndex}>
                    {label}
                    {showTooltip && toolTipText != null && (
                        <Tooltip
                            content={toolTipText}
                            tabIndex={undefined}
                            icon={undefined}
                            placement={undefined}
                            isLogoutLink={false}
                        />
                    )}
                </label>
            )}
            <textarea
                rows={rows}
                placeholder={placeholder}
                value={value}
                name={name}
                className={`${inputClass} ${
                    error !== null ? "border-error !bg-white" : "!bg-white"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </>
    );
};
export default TextAreaField;
