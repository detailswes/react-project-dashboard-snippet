import React, { type ReactElement } from "react";
import CustomCircularProgressbar from "./CustomCircularProgressbar";
import { type customChipConfig } from "../../types/includesTypes";

const StatusSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="5.50244" r="5" fill="#2AD430" />
    </svg>
);

const ExpireSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="5.50244" r="5" fill="#A9A9A9" />
    </svg>
);

const WatchSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.995 0.502441C2.235 0.502441 0 2.74244 0 5.50244C0 8.26244 2.235 10.5024 4.995 10.5024C7.76 10.5024 10 8.26244 10 5.50244C10 2.74244 7.76 0.502441 4.995 0.502441ZM5 9.50244C2.79 9.50244 1 7.71244 1 5.50244C1 3.29244 2.79 1.50244 5 1.50244C7.21 1.50244 9 3.29244 9 5.50244C9 7.71244 7.21 9.50244 5 9.50244Z"
            fill="#004DF6"
        />
        <path
            d="M5.25 3.00244H4.5V6.00244L7.125 7.57744L7.5 6.96244L5.25 5.62744V3.00244Z"
            fill="#004DF6"
        />
    </svg>
);

const UserSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.85025 4.68082C6.3363 5.19477 5.63924 5.4835 4.91241 5.4835C4.18557 5.4835 3.48851 5.19477 2.97456 4.68082C2.46061 4.16687 2.17188 3.4698 2.17188 2.74297C2.17188 2.01614 2.46061 1.31907 2.97456 0.805124C3.48851 0.291175 4.18557 0.00244141 4.91241 0.00244141C5.63924 0.00244141 6.3363 0.291175 6.85025 0.805124C7.3642 1.31907 7.65293 2.01614 7.65293 2.74297C7.65293 3.4698 7.3642 4.16687 6.85025 4.68082ZM3.26762 6.78066C3.81653 6.59698 4.40537 6.50242 5.00011 6.50244C5.59083 6.50355 6.17533 6.59927 6.71932 6.78401C7.26332 6.96875 7.75585 7.23878 8.16803 7.57825C8.58997 7.9138 8.9249 8.31306 9.15351 8.75298C9.38212 9.19291 9.49988 9.6648 9.5 10.1414C9.5 10.2372 9.45259 10.329 9.3682 10.3967C9.28381 10.4644 9.16936 10.5024 9.05001 10.5024H0.950214C0.832412 10.5025 0.719299 10.4654 0.635164 10.3993C0.551029 10.3331 0.502581 10.2431 0.500225 10.1487C0.494278 9.67154 0.60628 9.19821 0.829756 8.75603C1.05323 8.31386 1.38375 7.91161 1.8022 7.57255C2.22064 7.23349 2.71872 6.96433 3.26762 6.78066Z"
            fill="#FE7A48"
        />
    </svg>
);

const TasksSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="1.5" cy="2.00244" r="1.5" fill="#004DF6" />
        <circle cx="8.5" cy="9.00244" r="1.5" fill="#004DF6" />
        <path
            d="M1.49999 2.50244L1.49999 6.00244C1.49999 7.6593 2.84314 9.00244 4.49999 9.00244L8 9.00244"
            stroke="#004DF6"
        />
    </svg>
);

const LockSvg = (): ReactElement => (
    <svg
        width="8"
        height="11"
        viewBox="0 0 8 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.16732 4.46077H6.85482V3.31494C6.85482 2.56902 6.5585 1.85365 6.03105 1.3262C5.50361 0.798757 4.78824 0.502441 4.04232 0.502441C3.2964 0.502441 2.58103 0.798757 2.05358 1.3262C1.52613 1.85365 1.22982 2.56902 1.22982 3.31494V4.46077H0.917318C0.696304 4.46077 0.484342 4.54857 0.328062 4.70485C0.171782 4.86113 0.0839844 5.07309 0.0839844 5.29411V9.66911C0.0839844 9.89012 0.171782 10.1021 0.328062 10.2584C0.484342 10.4146 0.696304 10.5024 0.917318 10.5024H7.16732C7.38833 10.5024 7.60029 10.4146 7.75657 10.2584C7.91285 10.1021 8.00065 9.89012 8.00065 9.66911V5.29411C8.00065 5.07309 7.91285 4.86113 7.75657 4.70485C7.60029 4.54857 7.38833 4.46077 7.16732 4.46077ZM4.04232 8.21077C3.8775 8.21077 3.71638 8.1619 3.57934 8.07033C3.4423 7.97876 3.33549 7.84862 3.27242 7.69634C3.20934 7.54407 3.19284 7.37652 3.225 7.21487C3.25715 7.05322 3.33652 6.90473 3.45306 6.78819C3.56961 6.67164 3.71809 6.59227 3.87974 6.56012C4.04139 6.52797 4.20895 6.54447 4.36122 6.60754C4.51349 6.67061 4.64364 6.77743 4.73521 6.91447C4.82678 7.05151 4.87565 7.21262 4.87565 7.37744C4.87565 7.59845 4.78785 7.81042 4.63157 7.9667C4.47529 8.12298 4.26333 8.21077 4.04232 8.21077ZM5.81315 4.25244C5.81315 4.30769 5.7912 4.36069 5.75213 4.39976C5.71306 4.43883 5.66007 4.46077 5.60482 4.46077H2.47982C2.42456 4.46077 2.37157 4.43883 2.3325 4.39976C2.29343 4.36069 2.27148 4.30769 2.27148 4.25244V3.31494C2.27148 2.84529 2.45805 2.39487 2.79015 2.06277C3.12224 1.73068 3.57266 1.54411 4.04232 1.54411C4.51197 1.54411 4.96239 1.73068 5.29449 2.06277C5.62658 2.39487 5.81315 2.84529 5.81315 3.31494V4.25244Z"
            fill="#004DF6"
        />
    </svg>
);

const MissingSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="5.50244" r="5" fill="#FECD48" />
    </svg>
);

const BlockedSvg = (): ReactElement => (
    <svg
        width="10"
        height="11"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="5" cy="5.50244" r="5" fill="#FF0000" />
    </svg>
);

type IconName =
    | "status"
    | "expire"
    | "watch"
    | "user"
    | "tasks"
    | "lock"
    | "missing"
    | "blocked"
    | "internal"
    | "progress";

const ICON_MAP: Record<
    Exclude<IconName, "progress" | "internal">,
    ReactElement
> = {
    status: <StatusSvg />,
    expire: <ExpireSvg />,
    watch: <WatchSvg />,
    user: <UserSvg />,
    tasks: <TasksSvg />,
    lock: <LockSvg />,
    missing: <MissingSvg />,
    blocked: <BlockedSvg />,
};

const CustomChip = (props: customChipConfig): ReactElement => {
    const renderIcon = (): ReactElement | string | null => {
        if (props.icon === "progress") {
            return (
                <div className="w-[15px] h--[15px] mr-2">
                    <CustomCircularProgressbar
                        value={
                            props.progressComplete != null &&
                            (typeof props.progressComplete === "string"
                                ? props.progressComplete.length > 0
                                : props.progressComplete > 0)
                                ? props.progressComplete
                                : 0
                        }
                        text={null}
                    />
                </div>
            );
        }
        if (props.icon === "internal") {
            return "";
        }
        return (
            ICON_MAP[
                props.icon as Exclude<IconName, "progress" | "internal">
            ] ?? ICON_MAP.status
        );
    };

    return (
        <span className={`chip ${props.overrideClasses}`}>
            {renderIcon()}
            {props.content}
        </span>
    );
};

export default CustomChip;
