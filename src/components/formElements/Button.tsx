import React, { type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { type ButtonConfig } from "../../types/formElemetsTypes";
const Button = (props: ButtonConfig): ReactElement => {
    const { t } = useTranslation();

    return (
        <>
            <button
                type={props.attributes.type}
                className={`${props.classes} ${
                    (props.attributes.loader ?? false)
                        ? "bg-active border-active"
                        : "text-center"
                }`}
                disabled={props.attributes.disabled}
                onClick={props.attributes.clickEvent}
            >
                <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    className={`${
                        (props.attributes.loader ?? false)
                            ? "inline-block"
                            : "hidden"
                    }`}
                >
                    <g>
                        <path
                            d="M88 50 A38 38 0 0 1 50 88"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="3"
                        ></path>
                        <path
                            d="M50 88 A38 38 0 0 1 12 50.00000000000001"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="3"
                        ></path>
                        <path
                            d="M12 50.00000000000001 A38 38 0 0 1 49.99999999999999 12"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="3"
                        ></path>
                        <path
                            d="M49.99999999999999 12 A38 38 0 0 1 88 49.99999999999999"
                            fill="none"
                            stroke="#000000"
                            strokeWidth="3"
                        ></path>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 50 50;360 50 50"
                            dur="0.4s"
                            repeatCount="indefinite"
                        ></animateTransform>
                    </g>
                </svg>
                <span
                    className={`${
                        (props.attributes.loader ?? false) ? "hidden" : ""
                    }`}
                >
                    {t(props.attributes.value)}
                </span>
            </button>
        </>
    );
};

export default Button;
