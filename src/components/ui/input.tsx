import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  readOnly,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      readOnly={readOnly}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-gray-800 dark:selection:text-gray-800 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        !readOnly &&
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus:outline-none focus:border-brand-300 focus:ring-brand-500/20 dark:focus:border-brand-800",
        readOnly && "focus:outline-none focus:ring-0 focus:border-transparent",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 dark:border-gray-700 dark:text-white/90",
        className
      )}
      {...props}
    />
  );
}

export { Input };
