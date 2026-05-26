import React, {
    useEffect,
    useState,
    useCallback,
    type ReactElement,
} from "react";
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { type CustomCircularProgressbarConfig } from "../../types/includesTypes";

const CustomCircularProgressbar = ({
    value,
    text,
}: CustomCircularProgressbarConfig): ReactElement => {
    const [currentProgress, setCurrentProgress] = useState(0);

    const progressInterval = useCallback(() => {
        setCurrentProgress((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (currentProgress === value) {
            return;
        }
        const progressIntervalFunction = setInterval(progressInterval, 16);
        return () => {
            clearInterval(progressIntervalFunction);
        };
    }, [progressInterval, currentProgress]);

    useEffect(() => {
        setCurrentProgress(0);
    }, [value]);
    return (
        <>
            <CircularProgressbarWithChildren
                value={currentProgress}
                styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: "round",
                    textSize: "20px",
                    pathTransitionDuration: 0.5,
                    pathColor: `#044FF5`,
                    textColor: "#000",
                    trailColor: "#DFE9EE",
                    backgroundColor: "#3E98C7",
                })}
            >
                {(text !== null || text === 0) && (
                    <div className="text-[14px] font-inter-medium flex items-center">
                        {`${text}`}
                        <span className="text-[14px]">%</span>
                    </div>
                )}
            </CircularProgressbarWithChildren>
        </>
    );
};

export default CustomCircularProgressbar;
