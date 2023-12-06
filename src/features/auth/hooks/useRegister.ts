import { atom, useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';

const isSignUpAtom = atom(false);

const useRegister = () => {
  const [isSignUp, setIsSignUp] = useAtom(isSignUpAtom);

  const open = useCallback(() => {
    setIsSignUp(true);
  }, []);

  const close = useCallback(() => {
    setIsSignUp(false);
  }, []);

  return useMemo(
    () => ({
      isSignUp,
      open,
      close,
    }),
    [isSignUp, open, close]
  );
};

export default useRegister;
