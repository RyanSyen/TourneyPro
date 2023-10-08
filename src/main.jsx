import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import router from "./lib/router/router.jsx";
import { BounceLoader } from "react-spinners/BounceLoader";
import { ThemeProvider } from "@mui/material/styles";
import createMuiTheme from "./lib/mui/createMuiTheme";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_en from "./locales/en/global.json";
import global_zh from "./locales/zh/global.json";
import global_ms from "./locales/ms/global.json";

// https://reactrouter.com/en/main/routers/router-provider
// https://www.davidhu.io/react-spinners/storybook/?path=/story/bounceloader--main

const theme = createMuiTheme();

i18next.init({
  interpolation: { escapeValue: false },
  lng: "auto", // auto detect lang based on user's browser lang
  fallbackLng: "en", // if auto detect fail or translation not found then default will be English
  resources: {
    en: {
      global: global_en,
    },
    zh: {
      global: global_zh,
    },
    ms: {
      global: global_ms,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider theme={theme}>
        <RouterProvider
          router={router}
          fallbackElement={
            <BounceLoader
              color="#D3D3D3"
              loading
              size={60}
              speedMultiplier={0.8}
            />
          }
          future={{ v7_startTransition: true }}
        />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
