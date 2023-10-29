import PublicIcon from "@mui/icons-material/Public";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

import localeList from "../../locales/localeList";

const dropdownTypes = {
  basic: 0,
  variant: 1,
  withLabel: 2,
  withoutLabel: 3,
  autoWidth: 4,
  smallSize: 5,
};

// mui styled api -> https://mui.com/system/styled/#styled-component-options-styles-component
// styled(Component, [options])(styles) => Component
const CustomSelectOptions = {
  shouldForwardProp: (prop) => prop !== "disableOutline",
  label: "CustomDropdown",
};

const CustomSelect = styled(
  Select,
  CustomSelectOptions
)(({ theme, disableOutline }) => ({
  ...(disableOutline && {
    boxShadow: "none",

    // ".MuiOutlinedInput-notchedOutline": {
    //   border: 0,
    //   outline: 0,
    // },
    // "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    //   border: 0,
    // },
    // "& .MuiOutlinedInput-root.MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
    //   {
    //     border: 0,
    //   },
    // "& .MuiInput-root MuiSelect-select.Mui-focused": {
    //   backgroundColor: "transparent",
    // },
    "& .MuiSelect-select:focus": {
      backgroundColor: theme.palette.action.focus,
    },
    "& .MuiSelect-select:hover": {
      color: theme.palette.action.hover,
    },
    "& .MuiSvgIcon-root": {
      top: "12%",
    },
    // "& .MuiSvgIcon-root:hover": {
    //   color: theme.palette.action.hover,
    //   // backgroundColor: theme.palette.action.hover,
    // },
    "&:hover .MuiSvgIcon-root": {
      color: theme.palette.action.hover,
    },

    "& .MuiPaper-root": {
      borderRadius: "50px",
    },

    // "& .MuiSelect-select": {
    //   "& .MuiMenuItem-root": {
    //     padding: "7px 15px",
    //     backgroundColor: "white",
    //   },

    //   "& .Mui-selected": {
    //     backgroundColor: "transparent",
    //   },
    // },
  }),
}));

const Dropdown = (props) => {
  return (
    <Box
      sx={{
        minWidth: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "&:hover": {
          color: `${
            props.el.hoverColor.typography_primary_hover_color || "inherit"
          }`,
        },
      }}
    >
      <FormControl
        variant={props.el.variant}
        sx={{
          borderRadius: "50px",
        }}
        // className={props.customStyle.formControl}
      >
        {props.el.withLabel && (
          <InputLabel id={"label_" + props.title}>{props.title}</InputLabel>
        )}
        <CustomSelect
          labelId={"label_" + props.title} // for accessibility to match the input label's id
          id={"dropdown" + props.title}
          value={props.value}
          label={props.el.withLabel ? props.title : null} // comment to hide label at top of component
          onChange={props.onChange}
          inputProps={{ "aria-label": props.el.helperText }}
          displayEmpty={props.el.displayEmpty} // if true, allow display label without the floating label
          // {...props.el.disableUnderline && {disableUnderline}}
          disableUnderline={props.el.disableUnderline || {}}
          disableOutline={props.el.disableOutline}
          // hoverColor={
          //   props.el.hoverColor.typography_primary_hover_color || "inherit"
          // }
          // defaultValue=""
          MenuProps={{
            disableScrollLock: true,
          }}
          autoWidth
          renderValue={(value) => {
            // console.log(value);
            const lang = localeList.find((a) => a.Code == value).Locale;
            return (
              <Box sx={{ display: "flex", gap: 1 }}>
                <PublicIcon />
                {lang}
              </Box>
            );
          }}
          style={{ borderRadius: "50px" }}
        >
          {props.el.enableDefaultOpt && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          {props.data ? (
            props.data.map((item) => {
              return (
                <MenuItem key={uuidv1()} value={item.Code}>
                  {item.Locale}
                </MenuItem>
              );
            })
          ) : (
            <div>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </div>
          )}
        </CustomSelect>
        {props.el.displayHelperTxt && (
          <FormHelperText>{props.el.helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default Dropdown;

/*
  when using FormControl with the variant property, we need to provide a label in two places:
  - in the InputLabel component 
  - in the 'label' prop of the Select component
*/
