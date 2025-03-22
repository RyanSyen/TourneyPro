"use client";

// import { useState } from "react";
// import { CheckCircle2, Clock, AlertCircle, XCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils";
import {
  AlertIcon,
  CheckCircleIcon,
  ClockIcon,
  RotateCcwIcon,
} from "@/icons/components";
// import { motion } from "framer-motion"

type StatusType = "todo" | "in-progress" | "in-review" | "done";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
  variant?: "gradient" | "glow" | "minimal" | "bordered";
}

export function StatusBadge({
  status,
  className,
  variant = "gradient",
}: StatusBadgeProps) {
  // const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    todo: {
      label: "To Do",
      icon: ClockIcon,
      colors: {
        gradient: "from-slate-400 to-slate-600",
        glow: "bg-slate-800 shadow-slate-500/30",
        minimal: "border-slate-400 text-slate-700",
        bordered: "border-slate-400 text-slate-700",
      },
    },
    "in-progress": {
      label: "In Progress",
      icon: RotateCcwIcon,
      colors: {
        gradient: "from-blue-400 to-indigo-600",
        glow: "bg-indigo-900 shadow-indigo-500/50",
        minimal: "border-blue-400 text-blue-700",
        bordered: "border-blue-400 text-blue-700",
      },
    },
    "in-review": {
      label: "In Review",
      icon: AlertIcon,
      colors: {
        gradient: "from-purple-400 to-purple-600",
        glow: "bg-purple-900 shadow-purple-500/50",
        minimal: "border-purple-400 text-purple-700",
        bordered: "border-purple-400 text-purple-700",
      },
    },
    done: {
      label: "Done",
      icon: CheckCircleIcon,
      colors: {
        gradient: "from-emerald-400 to-green-600",
        glow: "bg-emerald-900 shadow-emerald-500/50",
        minimal: "border-emerald-400 text-emerald-700",
        bordered: "border-emerald-400 text-emerald-700",
      },
    },
  };

  const { label, icon: Icon, colors } = statusConfig[status];

  // Variants for different badge styles
  const badgeVariants = {
    gradient: cn(
      "bg-gradient-to-r text-white font-medium px-3 py-1.5 rounded-full",
      colors.gradient
    ),
    glow: cn(
      "text-white font-medium px-3 py-1.5 rounded-full shadow-lg",
      colors.glow
    ),
    minimal: cn(
      "bg-white font-medium px-3 py-1.5 rounded-full border-2",
      colors.minimal
    ),
    bordered: cn(
      "bg-transparent font-medium px-3 py-1.5 rounded-full border-2",
      colors.bordered
    ),
  };

  // Animation variants for the icon
  // const iconAnimations = {
  //   todo: {},
  //   "in-progress": {
  //     animate: {
  //       rotate: isHovered ? 360 : 0,
  //       transition: {
  //         duration: 1,
  //         ease: "linear",
  //         repeat: Number.POSITIVE_INFINITY,
  //       },
  //     },
  //   },
  //   "in-review": {
  //     animate: {
  //       scale: isHovered ? [1, 1.2, 1] : 1,
  //       transition: {
  //         duration: 0.5,
  //         repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
  //       },
  //     },
  //   },
  //   done: {
  //     animate: {
  //       scale: isHovered ? [1, 1.2, 1] : 1,
  //       transition: { duration: 0.3 },
  //     },
  //   },
  //   blocked: {
  //     animate: {
  //       rotate: isHovered ? [-5, 5, -5, 5, 0] : 0,
  //       transition: { duration: 0.4 },
  //     },
  //   },
  // };

  return (
    // <motion.div
    //   className={cn("inline-flex items-center gap-1.5 transition-all duration-300", badgeVariants[variant], className)}
    //   whileHover={{
    //     scale: 1.03,
    //     transition: { duration: 0.2 },
    //   }}
    //   onHoverStart={() => setIsHovered(true)}
    //   onHoverEnd={() => setIsHovered(false)}
    // >
    //   <motion.div {...iconAnimations[status]}>
    //     <Icon className="h-3.5 w-3.5" />
    //   </motion.div>
    //   <span>{label}</span>
    // </motion.div>
    <div
      className={cn(
        "inline-flex items-center gap-1.5 transition-all duration-300",
        badgeVariants[variant],
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  );
}
