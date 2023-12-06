import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const isScrolledAtom = atom(false);
const isOpenAtom = atom(false);

const useNavbar = () => {
  const [isScrolled, setIsScrolled] = useAtom(isScrolledAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isScrolled,
    isOpen,
    open,
    close,
  };
};

export default useNavbar;
