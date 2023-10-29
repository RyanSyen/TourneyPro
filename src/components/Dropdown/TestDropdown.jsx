import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const TestDropdown = (props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        variant={props.el.variant}
        // className={props.customStyle.formControl}
        fullWidth
      >
        {props.el.withLabel && (
          <InputLabel id={"label_" + props.title}>{props.title}</InputLabel>
        )}
        <Select
          labelId={"label_" + props.title} // for accessibility to match the input label's id
          id={"dropdown" + props.title}
          value={""}
          label={props.el.withLabel ? props.title : null} // comment to hide label at top of component
          onChange={props.onChange}
          inputProps={{ "aria-label": props.el.helperText }}
          displayEmpty={props.el.displayEmpty} // if true, allow display label without the floating label
          disableOutline={props.el.disableOutline}
        >
          {props.el.enableDefaultOpt && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}

          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        {props.el.displayHelperTxt && (
          <FormHelperText>{props.el.helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default TestDropdown;
