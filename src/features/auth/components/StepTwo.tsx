import 'react-phone-input-2/lib/style.css';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
// import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import ErrMsg from 'src/components/common/ErrMsg.tsx';
import Btn from 'src/components/inputs/button/Button.tsx';
import { useCountry } from 'src/hooks/useCountry.ts';
import { extDayjs, fx_dayjs } from 'src/lib/dayjs';

import useRegister from '../hooks/useRegister.ts';
import useStepTwo, { MobileInputProps } from '../hooks/useStepTwo.ts';

const MobileInput: React.FC<MobileInputProps> = ({
  phone,
  country,
  value,
  setPhone,
  localizer,
}) => {
  const onPhoneInputChange = (data: string) => {
    setPhone({ value: data, isValid: true });
  };

  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <InputLabel>
        {localizer('Label_MobileNumber')}
        <span className="required-star"> *</span>
      </InputLabel>
      <Box className="mobile-input">
        <PhoneInput
          country={country?.countryCode.toLowerCase()}
          placeholder={localizer('Placeholder_MobileNumber')}
          value={value}
          onChange={onPhoneInputChange}
          enableSearch
          autoFormat
          disabled={false}
          disableDropdown={false}
          disableCountryCode={false}
          enableAreaCodes={false}
          enableTerritories={false} // enable dependent territories with population of ~100,000 or lower
          enableLongNumbers={false}
          countryCodeEditable
          disableSearchIcon={false}
          inputProps={{
            name: 'mobile number',
            required: true,
            autoFocus: true,
            id: 'MobileInput',
          }}
          onlyCountries={[]}
          preferredCountries={['my']}
          excludeCountries={[]}
          specialLabel=""
        />
      </Box>
      {!phone?.isValid && (
        <ErrMsg>{localizer('ErrMsg_MobileNumber_Required')}</ErrMsg>
      )}
    </Box>
  );
};

const DobInput = () => {
  return <div>test</div>;
};

const StepTwo = () => {
  const { t: localizer } = useTranslation('global');
  const { formDataRef } = useRegister();
  const {
    phone,
    setPhone,
    dob,
    setDob,
    address,
    setAddress,
    DateInputRef,
    AddressInputRef,
    onFormValidate,
  } = useStepTwo();
  const country = useCountry();

  console.log('rendered');

  return (
    <Box sx={{ paddingTop: '30px' }}>
      <MobileInput
        phone={phone}
        country={country}
        value={formDataRef.current.mobile}
        setPhone={setPhone}
        localizer={localizer}
      />
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="DateOfBirth-label">
          {localizer('Label_DateOfBirth')}
        </InputLabel>
        <DateField
          sx={{ width: '100%', marginBottom: '0.25rem' }}
          value={dob?.value}
          onChange={(date: dayjs.Dayjs | null) => {
            console.log(date);
            setDob({ value: date, isValid: !!date });
          }}
          clearable
          onClear={() => console.log('cleared')}
          format={import.meta.env.VITE_DATE_FORMAT}
          formatDensity="dense"
        />
        {!dob?.isValid && (
          <ErrMsg>{localizer('ErrMsg_DateOfBirth_Required')}</ErrMsg>
        )}
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <InputLabel htmlFor="Address-label">
          {localizer('Label_Address')}
          <span className="required-star"> *</span>
        </InputLabel>
        <TextField
          variant="outlined"
          type="text"
          sx={{ marginBottom: '0.25rem' }}
          placeholder={localizer('Placeholder_Address')}
          inputRef={AddressInputRef}
          fullWidth
          onChange={(e) =>
            setAddress({
              value: e.target.value,
              isValid: e.target.value.length > 0,
            })
          }
        />
        {!address?.isValid && (
          <ErrMsg>{localizer('ErrMsg_Address_Required')}</ErrMsg>
        )}
      </Box>
      <Box
        className="flex-center"
        sx={{ gap: '8px', justifyContent: 'flex-end' }}
      >
        <Btn
          variant="filledSecondary"
          disabled={false}
          size="medium"
          isUploadBtn={false}
          type="button"
          onClick={() => console.log('back')}
        >
          {localizer('Label_Back')}
        </Btn>
        <Btn
          variant="filledPrimaryFullWidth"
          disabled={false}
          size="medium"
          isUploadBtn={false}
          type="button"
          onClick={onFormValidate}
        >
          {localizer('Label_Continue')}
        </Btn>
      </Box>
    </Box>
  );
};

export default React.memo(StepTwo);
