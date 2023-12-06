import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import localeList from 'lib/i18n/locales/localeList.ts';
import React from 'react';
import { v1 as uuidv1 } from 'uuid';

import Dropdown from '../Dropdown.tsx';
import DropdownContainer from './LanguageDropdown.styles.ts';
import useLanguageDropdown from './useLanguageDropdown.ts';

const Languages = localeList.map((lang) => {
  return (
    <MenuItem key={uuidv1()} value={lang.Code}>
      {lang.Locale}
    </MenuItem>
  );
});

// const DropdownTitle = ({ value }: { value: unknown }) => {
//   console.log('dropdown title prop', value);
//   const selectedlang = localeList.find(
//     (a) => a.Code === (value as string)
//   )!.Locale;
//   return (
//     <TitleComponent>
//       <Language />
//       {selectedlang}
//     </TitleComponent>
//   );
// };

const LanguageDropdown = () => {
  // dunno why render 4 times on first load instead of 2
  const langDropdown = useLanguageDropdown();
  console.log('value', langDropdown.lang);
  // console.log(
  //   'valueText',
  //   localeList.find((a) => a.Code === langDropdown.lang)!.Locale
  // );
  return (
    <DropdownContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          '&:hover': {
            color: `${'inherit'}`,
          },
        }}
      >
        <Dropdown
          helperText="Language Dropdown"
          isDisableUnderline
          isSelectionNone
          label="languageDropdown"
          onSelect={(event: SelectChangeEvent<unknown>) =>
            langDropdown.onChange(event.target.value)
          }
          value={
            langDropdown.lang || localeList.find((a) => a.Code === 'en')!.Code
          }
          valueText={
            localeList.find((a) => a.Code === langDropdown.lang)!.Locale
          }
          variant="standard"
        >
          {Languages}
        </Dropdown>
      </Box>
    </DropdownContainer>
  );
};

export default React.memo(LanguageDropdown);
