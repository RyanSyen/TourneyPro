import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { v1 as uuidv1 } from "uuid";

import localeList from "../../locales/localeList";
import media from "./../../lib/mui/styledComponents";
import Dropdown from "./Dropdown";

const DropdownContainer = styled(Box)`
  display: none;
  padding-right: 1.5rem;

  @media ${media.sm} {
    display: inline-flex;
  }
`;

const LanguageDropdown = () => {
  const theme = useTheme();
  const { i18n } = useTranslation("global");
  const [lang, setLang] = useState("");

  const elProp = {
    helperText: "language dropdown",
    variant: "standard",
    withLabel: false,
    displayEmpty: true,
    displayHelperTxt: false,
    enableDefaultOpt: false,
    disableUnderline: true,
    disableOutline: true,
    hoverColor: theme.dropdown.primaryHover,
  };

  const listItems = localeList.map((item) => {
    return (
      <MenuItem key={uuidv1()} value={item.Code}>
        {item.Locale}
      </MenuItem>
    );
  });

  const onChangeLang = (e) => {
    console.log(e.target.value);
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <DropdownContainer>
      <Dropdown
        el={elProp}
        title="Language"
        onChange={onChangeLang}
        value={lang || localeList.find((a) => a.Code == "en").Code}
      >
        {listItems}
      </Dropdown>
    </DropdownContainer>
  );
};

export default LanguageDropdown;

/*
    set border: none; to classname MuiOutlinedInput-notchedOutline
*/
