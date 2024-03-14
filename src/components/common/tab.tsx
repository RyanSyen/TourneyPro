import Link from "next/link";

interface TabProps {
  name: string;
  url: string;
  isCurrent: boolean;
}

const Tab = (props: TabProps) => {
  return (
    <Link
      href={props.url}
      className={`border border-spacing-4 rounded-3xl border-slate-400 bg-transparent text-sm px-4 py-1.5 hover:bg-[#fcfcfc] hover:text-[#e50b0d] hover:border-[#fcfcfc] text-nowrap ${
        props.isCurrent && "!bg-[#fcfcfc] !border-[#fcfcfc] text-[#e50b0d]"
      } `}
    >
      {props.name}
    </Link>
  );
};

export default Tab;
