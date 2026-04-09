import { useState, useEffect } from "react";

/*
  Hook que detecta si la pantalla es mobile (≤768px) y se actualiza
  automáticamente al redimensionar la ventana o rotar el dispositivo.
*/
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};