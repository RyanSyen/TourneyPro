import { atom, useAtom } from 'jotai';
import auth from 'lib/firebase/initAuth';
import { useCallback, useMemo } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { FieldValues, FormSubmitHandler, useForm } from 'react-hook-form';

const isShowPasswordAtom = atom(false);

type FormValues = {
  Email: string;
  Password: string;
};

const useLogin = () => {
  const [isShowPw, setIsShowPw] = useAtom(isShowPasswordAtom);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const togglePw = useCallback(() => {
    setIsShowPw(!isShowPw);
  }, [isShowPw]);

  const submit: FormSubmitHandler<FieldValues> = (
    formObj: FieldValues,
    e?: React.BaseSyntheticEvent
  ) => {
    const { Email, Password } = formObj.data;
    signInWithEmailAndPassword(Email, Password);
    // close();
  };

  // memoize the return object to ensure the same obj ref is returned if the props arent changed
  return useMemo(
    () => ({
      register,
      togglePw,
      isShowPw,
      submit,
      errors,
      handleSubmit,
      control,
      user,
      loading,
      error,
    }),
    [
      register,
      togglePw,
      isShowPw,
      submit,
      errors,
      handleSubmit,
      control,
      user,
      loading,
      error,
    ]
  );
};

export default useLogin;
