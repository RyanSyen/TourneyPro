import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import illustration from "../assets/error404-illustration.png";
import Btn from "../components/Button/Button";

const btnProp = {
  variant: "filledPrimaryShort",
  disabled: false,
  size: "medium",
  startIcon: <></>,
  endIcon: <></>,
  isUploadBtn: false,
};

const Error404 = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t: localizer } = useTranslation("global");

  console.log(localizer("error404.cta"));

  return (
    <div className="error-container">
      <div className="error-illustration">
        <img src={illustration} alt="error illustration" loading="lazy" />
      </div>
      <div className="error-description">
        <Typography
          align="left"
          gutterBottom
          noWrap={true}
          variant="h4"
          sx={{ color: theme.typography.primary.color, fontWeight: 600 }}
        >
          {/* Opps! Something went wrong. */}
          {localizer("error404.title")}
        </Typography>
        <Typography
          align="left"
          gutterBottom
          noWrap={true}
          variant="h6"
          sx={{ color: theme.typography.primary.color }}
        >
          {/* Please try again later or refresh the page. */}
          {localizer("error404.description")}
        </Typography>
        <Btn
          el={btnProp}
          text={localizer("error404.cta")}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default Error404;
