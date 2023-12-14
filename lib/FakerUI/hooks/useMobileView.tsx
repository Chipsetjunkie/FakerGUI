import { useState, useEffect } from "react"

export default function useMobileView(threshold?: number) {
    const SCREEN_SIZE_BREAKPOINT = threshold || 980
    const [isSmallScreen, setIsSmallScreen] = useState(false)


    useEffect(() => {
        function handleResize() {
            const isViewPortSmall = window.innerWidth < SCREEN_SIZE_BREAKPOINT
            if (isSmallScreen !== isViewPortSmall){
                setIsSmallScreen(isViewPortSmall)
            }
        }

        window.addEventListener("resize",handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSmallScreen])

    return isSmallScreen
}
