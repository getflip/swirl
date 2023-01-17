import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#portal") as HTMLElement)
    : null;
};

export default Portal;
