import { useEffect, useState } from "react";

export const useStickyHeader = () => {
  const [isSticky, setIsSticky] = useState<boolean>(true);
  const [lastY, setLastY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= lastY) setIsSticky(true);
      else setIsSticky(false);
      setLastY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastY]);
  return isSticky;
};
