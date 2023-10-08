import { useState } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const LanguageDropdown = () => {
  const [lang, setLang] = useState("");

  const onChangeLang = (e) => {
    setLang(e.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          id="demo-simple-select"
          value={lang}
          label="Language"
          onChange={onChangeLang}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageDropdown;

/*
    set border: none; to classname MuiOutlinedInput-notchedOutline
*/
