import Language from '@mui/icons-material/Language';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useCallback, useMemo } from 'react';

import { CustomSelect, TitleComponent } from './Dropdown.styles.ts';

interface DropdownProps {
  children: React.ReactNode;
  customVariant?: string;
  helperText: string;
  isDisableUnderline: boolean;
  isSelectionNone: boolean;
  label: string;
  onSelect: (event: SelectChangeEvent<unknown>) => void;
  value: string;
  valueText: string;
  variant: 'outlined' | 'standard' | 'filled' | undefined;
}

const Dropdown = (props: DropdownProps) => {
  const {
    children,
    customVariant,
    helperText,
    isDisableUnderline,
    isSelectionNone,
    label,
    onSelect,
    value,
    valueText,
    variant,
  } = props;

  //! render twice 3 times on first load => fixed

  const CustomTitleComponent = useCallback(() => {
    // console.log('CustomTitleComponent');
    return (
      <TitleComponent>
        <Language />
        {valueText}
      </TitleComponent>
    );
  }, [valueText]);

  const selectedValue = useMemo(() => {
    // console.log('selected value', value);
    return <CustomTitleComponent />;
  }, [value]);

  return (
    <FormControl>
      <CustomSelect
        autoWidth
        id={`dropdown_${label}`}
        variant={variant}
        value={value}
        onChange={(e) => onSelect(e)}
        inputProps={{ 'aria-label': helperText }}
        displayEmpty={isSelectionNone}
        disableUnderline={isDisableUnderline}
        defaultValue=""
        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            style: {
              width: customVariant === 'line-input' ? '376px' : undefined,
              border:
                customVariant === 'line-input'
                  ? '1px solid #8C94A1'
                  : undefined,
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        renderValue={() => selectedValue}
      >
        {children}
      </CustomSelect>
    </FormControl>
  );
};

Dropdown.defaultProps = {
  customVariant: '',
};

export default Dropdown;
