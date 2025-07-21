import { useEffect, useState } from "react";

const getWindowSize = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return { width, height };
}

export default function useWindowSize() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowSize());

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowSize());
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}