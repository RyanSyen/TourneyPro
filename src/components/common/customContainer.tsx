import { cn } from "@/lib/utils";

const CustomContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("bg-[#14141b] rounded-xl p-6", className)}>
      {children}
    </div>
  );
};

export default CustomContainer;
