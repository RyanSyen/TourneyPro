import { useEffect, useRef, useState } from "react";

type ConsoleType =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "table"
  | "group"
  | "groupCollapsed"
  | "groupEnd"
  | "clear"
  | "assert"
  | "count"
  | "countReset"
  | "time"
  | "timeEnd"
  | "trace"
  | "dir";

type LogLevel =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "table"
  | "dir"
  | "clear"
  | "assert"
  | "count"
  | "countReset"
  | "time"
  | "timeEnd"
  | "trace"
  | "dir";
type ConsoleMethod = keyof Pick<Console, LogLevel>;

const useLogger = (componentName: string, isLogEnabled = true) => {
  const log = (level: LogLevel, ...args: any[]) => {
    if (isLogEnabled) {
      (console[level] as (...args: any[]) => void).call(
        console,
        `${componentName} component: \n`,
        ...args
      );
    }
  };

  const logLifecycle = () => {
    log("log", `${componentName} mounted`);

    return () => {
      log("log", `${componentName} unmounted`);
    };
  };

  useEffect(logLifecycle, [componentName]);

  return {
    log: (level: ConsoleMethod, ...args: any[]) => log(level, ...args),
    info: log.bind(null, "info"),
    warn: log.bind(null, "warn"),
    error: log.bind(null, "error"),
  };
};

export default useLogger;
