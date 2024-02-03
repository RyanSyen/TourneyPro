import { usePathname } from "next/navigation";
import { getProviders } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { ProviderType } from "@/types/next-auth";

const useNavbar = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const [providers, setProviders] = useState<ProviderType>({
    providerData: null,
  });

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 100
        ? setIsTransparent(false)
        : setIsTransparent(pathName.trim() === "/");
    };

    const fetchProviders = async () => {
      try {
        const providers = await getProviders();
        setProviders((prevState) => ({
          ...prevState,
          providerData: providers,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProviders();

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

  const closeAuthDialog = () => {
    setOpen(false);
  };

  return {
    isTransparent,
    open,
    setOpen,
    providers,
    closeAuthDialog,
  };
};

export default useNavbar;
