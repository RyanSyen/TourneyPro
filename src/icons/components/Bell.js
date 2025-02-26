import * as React from "react";
const SvgBell = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
    <path
      fill="none"
      d="M10.75 2.292a.75.75 0 1 0-1.5 0v.544a6.376 6.376 0 0 0-5.625 6.331v5.292h-.292a.75.75 0 0 0 0 1.5h13.334a.75.75 0 1 0 0-1.5h-.292V9.167a6.376 6.376 0 0 0-5.625-6.33zm4.125 12.167V9.167a4.875 4.875 0 1 0-9.75 0v5.292zM8 17.71c0 .414.336.75.75.75h2.5a.75.75 0 1 0 0-1.5h-2.5a.75.75 0 0 0-.75.75"
    />
  </svg>
);
export default SvgBell;
