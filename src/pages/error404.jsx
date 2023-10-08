import illustration from "../assets/error404-illustration.png";
import { Typography } from "@mui/material";
import { useStyle } from "../context/styleContext";
import { useTranslation } from "react-i18next";

const Error404 = () => {
  const styleConst = useStyle();
  const { t: localizer } = useTranslation("global");

  return (
    <div className="error-container">
      <div className="error-illustration">
        <img src={illustration} alt="error illustration" loading="lazy" />
      </div>
      <div className="error-description">
        <Typography
          align="left"
          gutterBottom
          noWrap="false"
          variant="h4"
          sx={{ color: styleConst.typography_primary_color, fontWeight: 600 }}
        >
          {/* Opps! Something went wrong. */}
          {localizer("error404.title")}
        </Typography>
        <Typography
          align="left"
          gutterBottom
          noWrap="false"
          variant="h6"
          sx={{ color: styleConst.typography_primary_color }}
        >
          {/* Please try again later or refresh the page. */}
          {localizer("error404.description")}
        </Typography>
      </div>
    </div>
  );
};

export default Error404;
