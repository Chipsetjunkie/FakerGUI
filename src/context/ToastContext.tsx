import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "../components/Toast";

interface ContextProps {
  triggerPopup: (e:string) => void;
}

const Context = createContext<ContextProps>({
  triggerPopup: () => {},
});

export function ToastContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showPopup, setShowPopup] = useState({ status: false, text: "" });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function triggerPopup(message: string) {
    if (!showPopup.status) {
      setShowPopup({ status: true, text: message });
      timerRef.current = setTimeout(() => {
        setShowPopup({
          status: false,
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
          createPortal(<Toast  text={showPopup.text}/>, document.getElementById("popup")!)}
      </>
    </Context.Provider>
  );
}

export const useToast = () => useContext(Context);
