import { useState } from "react";

const useDropdown = () => {
  const [isExpand, setIsExpand] = useState(false);

  function toggle() {
    setIsExpand(!isExpand);
  }

  return [isExpand, toggle];
};

export default useDropdown;
