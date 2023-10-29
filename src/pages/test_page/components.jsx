import { Container } from "@mui/material";
import { TestDropdown as DropdownTest } from "../../components/Dropdown";
import { v1 as uuidv1 } from "uuid";

const TestDropdown = () => {
  var pocList = [
    {
      helperText: "basic (outlined default variant)",
      variant: "outlined",
      withLabel: true,
      displayEmpty: false,
      displayHelperTxt: true,
      enableDefaultOpt: true,
      disableUnderline: false,
      disableOutline: false,
    },
    {
      helperText: "basic without label",
      variant: "outlined",
      withLabel: false,
      displayEmpty: true,
      displayHelperTxt: true,
      enableDefaultOpt: true,
      disableUnderline: false,
      disableOutline: false,
    },
    {
      helperText: "standard variant",
      variant: "standard",
      withLabel: true,
      displayEmpty: false,
      displayHelperTxt: true,
      enableDefaultOpt: true,
      disableUnderline: false,
      disableOutline: false,
    },
    {
      helperText: "filled variant",
      variant: "filled",
      withLabel: false,
      displayEmpty: false,
      displayHelperTxt: true,
      enableDefaultOpt: true,
      disableUnderline: false,
      disableOutline: false,
    },
  ];
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {pocList.map((element) => {
          return <DropdownTest key={uuidv1()} el={element} title="Age" />;
        })}
      </Container>
    </>
  );
};

export default TestDropdown;
