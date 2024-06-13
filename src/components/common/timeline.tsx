import { cn } from "@/lib/utils";

const TimelineIcon = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  if (!children) {
    return (
      <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
    );
  }

  return (
    <div
      className={cn(
        "absolute left-0 translate-x-[-29.5px] z-10 top-1",
        className
      )}
    >
      {children}
    </div>
  );
};

const TimelineTitle = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h4
      className={cn(
        // "scroll-m-20 text-lg font-medium tracking-tight",
        "text-[1rem] font-medium tracking-tight leading-7",
        className
      )}
    >
      {children}
    </h4>
  );
};

const TimelineDescription = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("text-gray-500 dark:text-gray-400", className)}>
      {children}
    </div>
  );
};

const TimelineItem = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("grid gap-1 text-sm relative", className)}>
      {children}
    </div>
  );
};

const Timeline = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-5 dark:after:bg-gray-400/20",
        className
      )}
    >
      {children}
    </div>
  );
};

export {
  Timeline,
  TimelineDescription,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
};
