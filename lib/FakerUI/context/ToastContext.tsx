import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/FeatureComponents/Toast";
import { PORTAL_TOAST_ID } from "../utils/constants";

interface ContextProps {
  triggerPopup: (e: string, k?: "success" | "error") => void;
}

interface ProviderState {
  status: boolean,
  text: string,
  type: "success" | "error",
}

const Context = createContext<ContextProps>({
  triggerPopup: () => { },
});

export function ToastContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPopup, setShowPopup] = useState<ProviderState>({
    status: false,
    text: "",
    type: "success",
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);



  useEffect(() => {
    if (!document.getElementById(PORTAL_TOAST_ID)) {
      const body = document.querySelector("body")
      const portalDiv = document.createElement("div")
      portalDiv.setAttribute("id", PORTAL_TOAST_ID)
      body?.appendChild(portalDiv)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function triggerPopup(
    message: string,
    type: "success" | "error" = "success"
  ) {
    if (!showPopup.status) {
      setShowPopup({ status: true, text: message, type });
      timerRef.current = setTimeout(() => {
        setShowPopup({
          status: false,
          type,
          text: "",
        });
      }, 3000);
    }
  }

  return (
    <Context.Provider value={{ triggerPopup }}>
      <>
        {children}
        {showPopup.status &&
          createPortal(
            <div>
            <Toast text={showPopup.text} type={showPopup.type} />
            </div>,
            document.getElementById(PORTAL_TOAST_ID)!
          )}
      </>
    </Context.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(Context);
