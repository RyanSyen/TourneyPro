import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "../../../public/logo/logo.svg";

interface AppLogoProp {
  enableOnClick?: boolean;
  isHidden?: boolean;
}

const AppLogo = ({ enableOnClick = true, isHidden = false }: AppLogoProp) => {
  const router = useRouter();

  const redirectToIndex = () => router.push("/");

  return (
    <button
      className={`${
        isHidden ? "none" : "flex"
      } items-center p-0 m-0 cursor-pointer ${
        enableOnClick ? "pointer-events-auto" : "pointer-events-none"
      } select-none text-xl gap-1 bg-transparent`}
      onClick={redirectToIndex}
    >
      <Image src={logo} alt="App Icon" className="w-9 h-9 sm:w-11 sm:h-11" />
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-[#fcfcfc]">
        {process.env.NEXT_PUBLIC_PROJECT_NAME}
      </h3>
    </button>
  );
};

export default AppLogo;
