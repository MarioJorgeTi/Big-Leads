import { useEffect, useState } from "react"
import { GlobalContext } from "./globalContext"
import useWindowSize from "../../hooks/useWindowSize";

export const GlobalProvider = ({ children }) => {
    const { width } = useWindowSize();
    const [errorCatcher, setErrorCatcher] = useState('')
    const [isMobile, setIsMobile] = useState(false);

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
    }, [width]);

    return (
        <GlobalContext.Provider value={{
            isMobile,
            errorCatcher,
            setErrorCatcher
        }}>
            {children}
        </GlobalContext.Provider>
    )
}