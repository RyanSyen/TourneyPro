import { cn } from "@/lib/utils";

const TimelineIcon = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  if (!children) {
    console.log("no children");
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
        "scroll-m-20 text-lg font-medium tracking-tight",
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
        "after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 relative pl-6 after:left-0 grid gap-10 dark:after:bg-gray-400/20",
        className
      )}
    >
      {children}
    </div>
  );
};

const TimelinePlayground = () => {
  return (
    <div className="p-6 sm:p-10">
      <Timeline>
        <TimelineItem>
          <TimelineIcon />
          <TimelineTitle>
            March 14, 1879 - Invention of Quantum Computing
          </TimelineTitle>
          <TimelineDescription>
            Scientists at a leading research institution unveil a groundbreaking
            breakthrough in quantum computing
          </TimelineDescription>
        </TimelineItem>
        <TimelineItem>
          <TimelineIcon />
          <TimelineTitle>
            March 14, 1879 - Invention of Quantum Computing
          </TimelineTitle>
          <TimelineDescription>
            Scientists at a leading research institution unveil a groundbreaking
            breakthrough in quantum computing
          </TimelineDescription>
        </TimelineItem>
      </Timeline>
    </div>
  );
};

export default TimelinePlayground;
