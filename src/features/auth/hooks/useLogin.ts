import { atom, useAtom } from 'jotai';
import auth from 'lib/firebase/initAuth';
import { useCallback, useMemo } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';

const isOpenLoginAtom = atom(false);
const isShowPasswordAtom = atom(false);

type FormValues = {
  Email: string;
  Password: string;
};

const useLogin = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenLoginAtom);
  const [isShowPw, setIsShowPw] = useAtom(isShowPasswordAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePw = useCallback((show: boolean) => {
    setIsShowPw(show);
  }, []);

  const submit: SubmitHandler<FormValues> = (data) => {
    const { Email, Password } = data;
    signInWithEmailAndPassword(Email, Password);
  };

  // memoize the return object to ensure the same obj ref is returned if the props arent changed
  return useMemo(
    () => ({
      isOpen,
      open,
      close,
      register,
      togglePw,
      isShowPw,
      submit,
      errors,
      handleSubmit,
    }),
    [
      isOpen,
      open,
      close,
      register,
      togglePw,
      isShowPw,
      submit,
      errors,
      handleSubmit,
    ]
  );
};

export default useLogin;
