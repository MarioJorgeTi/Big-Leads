import { useEffect, useState } from "react"
import { GlobalContext } from "./globalContext"
import useWindowSize from "../../hooks/useWindowSize";

export const GlobalProvider = ({ children }) => {
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (width <= 425) {
            setIsMobile(true);
            setIsTablet(false);
            setIsDesktop(false);
        }

        if (width > 425 && width <= 1024) {
            setIsMobile(false);
            setIsTablet(true);
            setIsDesktop(false);
        }

        if (width > 1024) {
            setIsMobile(false);
            setIsTablet(false);
            setIsDesktop(true);
        }
    }, [width]);

    return (
        <GlobalContext.Provider value={{
            isMobile,
            isTablet,
            isDesktop
        }}>
            {children}
        </GlobalContext.Provider>
    )
}