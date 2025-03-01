// "use client"

// import { useTheme } from "next-themes"
// import { Toaster as Sonner, ToasterProps } from "sonner"

// const Toaster = ({ ...props }: ToasterProps) => {
//   const { theme = "system" } = useTheme()

//   return (
//     <Sonner
//       theme={theme as ToasterProps["theme"]}
//       className="toaster group"
//       toastOptions={{
//         classNames: {
//           toast:
//             "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
//           description: "group-[.toast]:text-muted-foreground",
//           actionButton:
//             "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium",
//           cancelButton:
//             "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium",
//         },
//       }}
//       {...props}
//     />
//   )
// }

// export { Toaster }

"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-theme-lg group-[.toaster]:border group-[.toaster]:rounded-lg p-4 flex items-center gap-4",
          title: "font-semibold text-lg",
          description: "text-sm text-color-gray-600 dark:text-color-gray-300",
          actionButton:
            "group-[.toast]:bg-color-brand-600 group-[.toast]:text-white font-medium px-4 py-2 rounded-md hover:bg-color-brand-700 transition",
          cancelButton:
            "group-[.toast]:bg-color-gray-200 dark:group-[.toast]:bg-color-gray-700 group-[.toast]:text-color-gray-700 dark:group-[.toast]:text-color-gray-300 font-medium px-4 py-2 rounded-md hover:bg-color-gray-300 dark:hover:bg-color-gray-600 transition",
          success:
            "group-[.toast]:bg-color-success-100 group-[.toast]:text-color-success-800 border-l-4 border-color-success-500",
          error:
            "group-[.toast]:bg-color-error-100 group-[.toast]:text-color-error-800 border-l-4 border-color-error-500",
          warning:
            "group-[.toast]:bg-color-warning-100 group-[.toast]:text-color-warning-800 border-l-4 border-color-warning-500",
          info: "group-[.toast]:bg-color-blue-light-100 group-[.toast]:text-color-blue-light-800 border-l-4 border-color-blue-light-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
