import dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { atom, SetStateAction, useAtom } from 'jotai';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { CountryData } from 'react-phone-input-2';
import { ICountry } from 'src/hooks/useCountry.ts';
import { fx_dayjs } from 'src/lib/dayjs';

import useRegister from './useRegister.ts';

type SetAtom<Args extends unknown[], Result> = (...args: Args) => Result;

interface IPhone {
  value: string;
  isValid: boolean;
}

interface IDOB {
  value: dayjs.Dayjs | null;
  isValid: boolean;
}

interface IAddress {
  value: string;
  isValid: boolean;
}

interface MobileInputProps {
  phone: IPhone;
  country: ICountry | undefined;
  value: string;
  setPhone: SetAtom<[SetStateAction<IPhone>], void>;
  localizer: TFunction<'global', undefined>;
}

const phoneAtom = atom<IPhone>({
  value: '',
  isValid: true,
});
const dobAtom = atom<IDOB>({
  value: null,
  isValid: true,
});
const addressAtom = atom<IAddress>({
  value: '',
  isValid: true,
});

const useStepTwo = () => {
  const [phone, setPhone] = useAtom(phoneAtom);
  const [dob, setDob]: [IDOB, (val: SetStateAction<IDOB>) => null] =
    useAtom<IDOB>(dobAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const { formDataRef } = useRegister();

  const DateInputRef = useRef<HTMLInputElement>(null);
  const AddressInputRef = useRef<HTMLInputElement>(null);
  const DateTextRef = useRef<string>(null);
  const isFormValid = useRef(true);

  useEffect(() => {
    if (!phone.isValid) {
      document.getElementById('MobileInput')?.focus();
    } else if (!dob.isValid) {
      DateInputRef.current?.focus();
    } else if (!address.isValid) {
      AddressInputRef.current?.focus();
    }
  }, [phone, dob, address]);

  const onFormValidate = useCallback(() => {
    console.log(dob.value);
    // if (!phone.value) {
    //   console.log('phone is invalid');
    //   setPhone({ value: phone.value, isValid: false });
    //   isFormValid.current = false;
    // }
    // if (!dob.value) {
    //   console.log('dob is invalid');
    //   setDob({ value: dob.value, isValid: false });
    //   isFormValid.current = false;
    // }
    // if (!address.value) {
    //   console.log('address is invalid');
    //   setAddress({ value: address.value, isValid: false });
    //   isFormValid.current = false;
    // }
    setPhone({ value: phone.value, isValid: !!phone.value });
    setDob({ value: dob.value, isValid: !!dob.value });
    setAddress({ value: address.value, isValid: !!address.value });
    isFormValid.current = !!phone.value && !!dob.value && !!address.value;

    console.log('isFormValid', isFormValid.current);

    if (isFormValid.current) {
      formDataRef.current.mobile = phone.value;
      formDataRef.current.dob = dayjs(dob.value).format(
        import.meta.env.VITE_DATE_FORMAT
      );
      formDataRef.current.address = address.value;
    }
  }, [phone, dob, address]);

  return useMemo(
    () => ({
      phone,
      setPhone,
      dob,
      setDob,
      address,
      setAddress,
      DateInputRef,
      AddressInputRef,
      onFormValidate,
    }),
    [
      phone,
      setPhone,
      dob,
      setDob,
      address,
      setAddress,
      DateInputRef,
      AddressInputRef,
      onFormValidate,
    ]
  );
};

export default useStepTwo;
export type { MobileInputProps };
