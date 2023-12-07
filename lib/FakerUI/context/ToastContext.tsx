import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";

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
    if (!document.getElementById("popup")) {
      const body = document.querySelector("body")
      const portalDiv = document.createElement("div")
      portalDiv.setAttribute("id", "popup")
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
            <Toast text={showPopup.text} type={showPopup.type} />,
            document.getElementById("popup")!
          )}
      </>
    </Context.Provider>
  );
}

export const useToast = () => useContext(Context);
