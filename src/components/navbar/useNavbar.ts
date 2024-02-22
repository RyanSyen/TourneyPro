import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useNavbar = () => {
  const pathName = usePathname();
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100
        ? setIsTransparent(false)
        : setIsTransparent(pathName.trim() === "/");
    };

    if (pathName.trim() === "/") {
      setIsTransparent(true);
      window.addEventListener("scroll", handleScroll);

      // removes the event listener when component unmounts to prev memory leak
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setIsTransparent(false);
    }
  }, [pathName]);

  return {
    isTransparent,
  };
};

export default useNavbar;
