// import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

// const badgeVariants = cva(
//   "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
//   {
//     variants: {
//       variant: {
//         default:
//           "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
//         secondary:
//           "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
//         destructive:
//           "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
//         outline:
//           "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function Badge({
//   className,
//   variant,
//   asChild = false,
//   ...props
// }: React.ComponentProps<"span"> &
//   VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
//   const Comp = asChild ? Slot : "span"

//   return (
//     <Comp
//       data-slot="badge"
//       className={cn(badgeVariants({ variant }), className)}
//       {...props}
//     />
//   )
// }

// export { Badge, badgeVariants }

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1.5 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all overflow-hidden",
  {
    variants: {
      variant: {
        primary: "",
        success: "",
        error: "",
        warning: "",
        info: "",
        epic: "",
        light: "",
        dark: "",
      },
      background: {
        light: "",
        solid: "",
      },
      iconPosition: {
        none: "",
        left: "",
        right: "",
      },
    },
    compoundVariants: [
      // Primary variant
      {
        variant: "primary",
        background: "light",
        class: "bg-primary/10 text-primary border-transparent",
      },
      {
        variant: "primary",
        background: "solid",
        class: "bg-primary text-primary-foreground border-transparent",
      },
      // Success variant
      {
        variant: "success",
        background: "light",
        class: "bg-green-500/10 text-green-500 border-transparent",
      },
      {
        variant: "success",
        background: "solid",
        class: "bg-green-500 text-white border-transparent",
      },
      // Error variant
      {
        variant: "error",
        background: "light",
        class: "bg-destructive/10 text-destructive border-transparent",
      },
      {
        variant: "error",
        background: "solid",
        class: "bg-destructive text-destructive-foreground border-transparent",
      },
      // Warning variant
      {
        variant: "warning",
        background: "light",
        class: "bg-amber-500/10 text-amber-500 border-transparent",
      },
      {
        variant: "warning",
        background: "solid",
        class: "bg-amber-500 text-white border-transparent",
      },
      // Info variant
      {
        variant: "info",
        background: "light",
        class: "bg-sky-500/10 text-sky-500 border-transparent",
      },
      {
        variant: "info",
        background: "solid",
        class: "bg-sky-500 text-white border-transparent",
      },
      // Epic variant
      {
        variant: "epic",
        background: "light",
        class: "bg-purple-500/10 text-purple-500 border-transparent",
      },
      {
        variant: "epic",
        background: "solid",
        class: "bg-purple-500 text-white border-transparent",
      },
      // Light variant
      {
        variant: "light",
        background: "light",
        class: "bg-background text-foreground border border-border",
      },
      {
        variant: "light",
        background: "solid",
        class: "bg-muted text-muted-foreground border-transparent",
      },
      // Dark variant
      {
        variant: "dark",
        background: "light",
        class: "bg-foreground/10 text-foreground border-transparent",
      },
      {
        variant: "dark",
        background: "solid",
        class: "bg-foreground text-background border-transparent",
      },
    ],
    defaultVariants: {
      variant: "primary",
      background: "light",
      iconPosition: "none",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

function Badge({
  className,
  variant,
  background,
  iconPosition,
  asChild = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, background, iconPosition }),
        className
      )}
      {...props}
    >
      {iconPosition === "left" && icon}
      {children}
      {iconPosition === "right" && icon}
    </Comp>
  );
}

export { Badge, badgeVariants };
