"use client";

// import { useState } from "react";
// import { ArrowUp, ArrowDown, Minus, AlertOctagon } from "lucide-react"
import { cn } from "@/lib/utils";
// import { motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertIcon, ArrowDownIcon, ArrowUpIcon } from "@/icons/components";

export type PriorityType = "highest" | "high" | "medium" | "low" | "lowest";

interface PriorityBadgeProps {
  priority: PriorityType;
  className?: string;
  showLabel?: boolean;
  variant?: "pill" | "chip" | "dot" | "bar";
}

export function PriorityBadge({
  priority,
  className,
  showLabel = true,
  variant = "pill",
}: PriorityBadgeProps) {
  // const [isHovered, setIsHovered] = useState(false);

  const priorityConfig = {
    highest: {
      label: "Highest",
      icon: AlertIcon,
      colors: {
        pill: "bg-gradient-to-r from-red-500 to-rose-700 text-white",
        chip: "bg-white border-2 border-red-500 text-red-700",
        dot: "text-red-700",
        bar: "text-red-700 border-red-500",
      },
      description: "This issue needs immediate attention",
    },
    high: {
      label: "High",
      icon: ArrowUpIcon,
      colors: {
        pill: "bg-gradient-to-r from-orange-400 to-red-500 text-white",
        chip: "bg-white border-2 border-orange-500 text-orange-700",
        dot: "text-orange-700",
        bar: "text-orange-700 border-orange-500",
      },
      description: "This issue has high impact and should be prioritized",
    },
    medium: {
      label: "Medium",
      icon: ArrowUpIcon,
      colors: {
        pill: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
        chip: "bg-white border-2 border-amber-500 text-amber-700",
        dot: "text-amber-700",
        bar: "text-amber-700 border-amber-500",
      },
      description: "This issue has normal priority",
    },
    low: {
      label: "Low",
      icon: ArrowDownIcon,
      colors: {
        pill: "bg-gradient-to-r from-green-400 to-emerald-600 text-white",
        chip: "bg-white border-2 border-green-500 text-green-700",
        dot: "text-green-700",
        bar: "text-green-700 border-green-500",
      },
      description: "This issue has low impact",
    },
    lowest: {
      label: "Lowest",
      icon: ArrowDownIcon,
      colors: {
        pill: "bg-gradient-to-r from-slate-400 to-slate-600 text-white",
        chip: "bg-white border-2 border-slate-500 text-slate-700",
        dot: "text-slate-700",
        bar: "text-slate-700 border-slate-500",
      },
      description: "This issue has minimal impact",
    },
  };

  const { label, icon: Icon, colors, description } = priorityConfig[priority];

  // Variants for different badge styles
  const badgeVariants = {
    pill: cn("rounded-full px-3 py-1.5 font-medium shadow-sm", colors.pill),
    chip: cn("rounded-full px-3 py-1.5 font-medium shadow-sm", colors.chip),
    dot: cn("flex items-center gap-1.5 font-medium", colors.dot),
    bar: cn(
      "flex items-center gap-1.5 border-l-4 pl-2 py-1 font-medium",
      colors.bar
    ),
  };

  // Animation variants for the icon
  // const iconAnimations = {
  //   highest: {
  //     animate: {
  //       scale: isHovered ? [1, 1.2, 1] : 1,
  //       transition: {
  //         duration: 0.5,
  //         repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
  //         repeatDelay: 0.5,
  //       },
  //     },
  //   },
  //   high: {
  //     animate: {
  //       y: isHovered ? [-2, 0] : 0,
  //       transition: {
  //         duration: 0.3,
  //         repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
  //         repeatType: "reverse",
  //       },
  //     },
  //   },
  //   medium: {},
  //   low: {
  //     animate: {
  //       y: isHovered ? [0, 2] : 0,
  //       transition: {
  //         duration: 0.3,
  //         repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
  //         repeatType: "reverse",
  //       },
  //     },
  //   },
  //   lowest: {
  //     animate: {
  //       y: isHovered ? [0, 2] : 0,
  //       transition: {
  //         duration: 0.3,
  //         repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
  //         repeatType: "reverse",
  //       },
  //     },
  //   },
  // };

  const dotVariant = (
    <div className="flex items-center gap-1.5">
      {/* <motion.div
        className={`h-3 w-3 rounded-full ${colors.dot.replace("text-", "bg-")}`}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          transition: { duration: 0.5 },
        }}
      /> */}
      <div
        className={`h-3 w-3 rounded-full ${colors.dot.replace("text-", "bg-")}`}
      />
      {showLabel && <span>{label}</span>}
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* <motion.div
            className={cn("inline-flex items-center gap-1.5 cursor-pointer", badgeVariants[variant], className)}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {variant === "dot" ? (
              dotVariant
            ) : (
              <>
                <motion.div {...iconAnimations[priority]}>
                  <Icon className="h-3.5 w-3.5" />
                </motion.div>
                {showLabel && <span>{label}</span>}
              </>
            )}
          </motion.div> */}
          <div
            className={cn(
              "inline-flex items-center gap-1.5 cursor-pointer",
              badgeVariants[variant],
              className
            )}
          >
            {variant === "dot" ? (
              dotVariant
            ) : (
              <>
                <Icon className="h-3.5 w-3.5" />
                {showLabel && <span>{label}</span>}
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
