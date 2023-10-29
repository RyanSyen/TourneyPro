import "./index.scss";

import { ThemeProvider } from "@mui/material/styles";
import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { RouterProvider } from "react-router-dom";

import CustomLoader from "./components/Common/CustomLoader";
import { UserContextProvider } from "./context/userContext";
import createMuiTheme from "./lib/mui/createMuiTheme";
import router from "./lib/router/router.jsx";
import global_en from "./locales/en/global.json";
import global_ms from "./locales/ms/global.json";
import global_zh from "./locales/zh/global.json";

// https://reactrouter.com/en/main/routers/router-provider
// https://www.davidhu.io/react-spinners/storybook/?path=/story/bounceloader--main

const theme = createMuiTheme();

i18next
  .use(initReactI18next) // pass instance to be used by all components
  .init({
    interpolation: { escapeValue: false }, // not needed for react as it escapes by default
    lng: "auto", // auto detect lang based on user's browser lang
    fallbackLng: "en", // if auto detect fail or translation not found then default will be English
    debug: false,
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
        <UserContextProvider>
          <RouterProvider
            router={router}
            fallbackElement={<CustomLoader />}
            future={{ v7_startTransition: true }}
          />
        </UserContextProvider>
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
