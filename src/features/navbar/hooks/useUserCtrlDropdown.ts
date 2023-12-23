import { signOut } from 'firebase/auth';
import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from 'src/lib/firebase/initAuth';

const anchorElAtom = atom<HTMLElement | null>(null);
const isExpandAtom = atom(false);

const useUserCtrlDropdown = () => {
  const [anchorEl, setAnchorEl] = useAtom(anchorElAtom);
  const [isExpand, setIsExpand] = useAtom(isExpandAtom);
  const navigate = useNavigate();

  const onClickRoute = useCallback((route: string) => {
    if (route) {
      navigate(route);
    } else {
      signOut(auth);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsExpand(!isExpand);
  }, [isExpand]);

  const setAnchor = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const targetEl: HTMLElement = e.currentTarget;
      setAnchorEl(targetEl);
    },
    [anchorEl]
  );

  return {
    // user,
    anchorEl,
    onClickRoute,
    toggle,
    setAnchor,
    isExpand,
  };
};

export default useUserCtrlDropdown;
