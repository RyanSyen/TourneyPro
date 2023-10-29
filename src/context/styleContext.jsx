import { createContext, useContext } from "react";

import * as constants from "../customStyles";

const StyleContext = createContext();

const useStyle = () => useContext(StyleContext);

const StyleProvider = ({ children }) => {
  return (
    <StyleContext.Provider value={constants}>{children}</StyleContext.Provider>
  );
};

export { StyleProvider, useStyle };

//* apply in component
// const { primaryColor, fontSizeMedium } = useStyle();
// <button style={{ backgroundColor: primaryColor, fontSize: fontSizeMedium }}>
//       Click me
//     </button>
