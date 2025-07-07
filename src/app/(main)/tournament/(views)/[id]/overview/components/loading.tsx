import { Spinner } from "@/components/ui/spinner";
import React from "react";

function loading() {
  return (
    <div className="flex justify-center items-center gap-3">
      <Spinner size="large" />
    </div>
  );
}

export default loading;
