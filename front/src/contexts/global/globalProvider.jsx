import { useEffect, useState } from "react"
import { GlobalContext } from "./globalContext"
import useWindowSize from "../../hooks/useWindowSize";

export const GlobalProvider = ({ children }) => {
    const { width } = useWindowSize();
    const [isMobile, setIsMobile] = useState(false);
    const [menuIsBigger, setMenuIsBigger] = useState(false)

    const updateMenuSize = () => {
        setMenuIsBigger(!menuIsBigger);
    }

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
        <GlobalContext.Provider value={{
            isMobile,
            menuIsBigger,
            updateMenuSize
        }}>
            {children}
        </GlobalContext.Provider>
    )
}