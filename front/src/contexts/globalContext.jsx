import { createContext, useContext, useEffect, useState } from "react"
import useWindowSize from "../hooks/useWindowSize";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = useState(false);
    const [menuIsBigger, setMenuIsBigger] = useState(false)

    useEffect(() => {
        if (width <= 425) {
            setIsMobile(true);
        }

        if (width > 425 && width <= 1024) {
            setIsMobile(false);
        }

        if (width > 1024) {
            setIsMobile(false);
        }
    }, [width, menuIsBigger]);

    return (
        <GlobalContext.Provider
            value={{
                isMobile,
                menuIsBigger,
                setMenuIsBigger
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => {
    return useContext(GlobalContext);
}