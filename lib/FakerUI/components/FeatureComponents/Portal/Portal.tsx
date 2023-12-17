import { PORTAL_TOAST_ID } from '@lib/FakerUI/utils/constants'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'


interface PortalProps {
    portalId: string
    children: React.ReactNode
}

export default function Portal({ portalId, children }: Readonly<PortalProps>) {
    const [hasInjected, setHasInjected] = useState(false)

    useEffect(() => {
        if (!document.getElementById(portalId)) {
            const body = document.querySelector("body")
            const portalDiv = document.createElement("div")
            portalDiv.setAttribute("id", portalId)
            const toastElement = document.getElementById(PORTAL_TOAST_ID)
            if (toastElement) {
                body?.insertBefore(portalDiv, toastElement)
            } else {
                body?.appendChild(portalDiv)
            }

            setHasInjected(true)

        } else {
            console.warn("portalId already exists")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>
        {hasInjected && createPortal(children, document.getElementById(portalId)!)}
    </div>
}
