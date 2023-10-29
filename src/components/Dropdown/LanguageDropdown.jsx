import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { typography_primary_hover_color } from "../../customStyles";
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
    hoverColor: { typography_primary_hover_color },
  };

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
        data={localeList}
        onChange={onChangeLang}
        value={lang || localeList.find((a) => a.Code == "en").Code}
      />
    </DropdownContainer>
  );
};

export default LanguageDropdown;

/*
    set border: none; to classname MuiOutlinedInput-notchedOutline
*/
