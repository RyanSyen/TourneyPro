import { useCallback, useEffect, useState } from "react";

const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // y position > 100 pixels
      //   if (window.scrollY > 100) {
      //     setIsScrolled(true);
      //   } else {
      //     setIsScrolled(false);
      //   }
      window.scrollY > 100 ? setIsScrolled(true) : setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    // removes the event listener when component unmounts to prev memory leak
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const open = () => setIsOpen(true);
  const close = () => setIsScrolled(false);

  return {
    isScrolled,
    isOpen,
    open,
    close,
  };
};

export default useNavbar;
