import { atom, useAtom } from 'jotai';
import { useCallback, useMemo, useRef } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from 'src/lib/firebase/initAuth';

const isSignUpAtom = atom(false);

const useRegister = () => {
  const [isSignUp, setIsSignUp] = useAtom(isSignUpAtom);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const formDataRef = useRef({
    fullName: '',
    emailAddress: '',
    password: '',
    mobile: '',
    dob: '',
    dobTxt: '',
    address: '',
    gender: '0',
    genderText: '',
    employment: '0',
    employmentText: '',
    country: '',
    countryCode: '',
  });

  const open = useCallback(() => {
    setIsSignUp(true);
  }, []);

  const close = useCallback(() => {
    setIsSignUp(false);
  }, []);

  const signup = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result?.operationType === 'signIn') {
        // create user
        console.log(result);
      }
    });
  }, []);

  return useMemo(
    () => ({
      isSignUp,
      open,
      close,
      signup,
      loading,
      formDataRef,
    }),
    [isSignUp, open, close, signup, loading, formDataRef]
  );
};

export default useRegister;
