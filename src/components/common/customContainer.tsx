import { ReactNode } from "react";

const CustomContainer = ({ children }: { children: ReactNode }) => {
  return <div className="bg-[#14141b] rounded-xl p-6">{children}</div>;
};

export default CustomContainer;
