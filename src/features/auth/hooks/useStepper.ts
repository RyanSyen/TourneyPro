import dayjs from 'dayjs';
import { atom, useAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';

import useRegister from './useRegister.ts';

const stepAtom = atom(1);
const isShowPasswordAtom = atom(false);

const useStepper = () => {
  const [step, setStep] = useAtom(stepAtom);
  const [isShowPw, setIsShowPw] = useAtom(isShowPasswordAtom);
  const { formDataRef } = useRegister();
  const [phone, setPhone] = useState({
    value: formDataRef.current.mobile,
    isValid: true,
  });
  const [date, setDate] = useState({
    value: formDataRef.current.dob ? dayjs(formDataRef.current.dob) : null,
    isValid: true,
  });

  const nextStep = useCallback((isNext = true) => {
    setStep((state) => (isNext ? state + 1 : state - 1));
  }, []);

  const togglePassword = useCallback(() => {
    setIsShowPw((show) => !show);
  }, [setIsShowPw]);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
  }, []);

  return useMemo(
    () => ({
      step,
      nextStep,
      isShowPw,
      togglePassword,
      onMouseDown,
    }),
    [step, nextStep, isShowPw, togglePassword, onMouseDown]
  );
};

export default useStepper;
