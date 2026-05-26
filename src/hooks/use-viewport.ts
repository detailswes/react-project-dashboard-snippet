import { useState, useEffect, useRef } from "react";

const useViewport = (): number => {
    const [width, setWidth] = useState(window.innerWidth);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleWindowResize = (): void => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setWidth(window.innerWidth);
            }, 100);
        };

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return width;
};
export default useViewport;
