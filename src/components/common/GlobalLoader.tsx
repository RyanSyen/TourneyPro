import { Spinner } from "@/components/ui/spinner";
import React from "react";

function GlobalLoader() {
  return (
    <div className="flex justify-center items-center gap-3 pt-4">
      <Spinner size="large" />
    </div>
  );
}

export default GlobalLoader;
