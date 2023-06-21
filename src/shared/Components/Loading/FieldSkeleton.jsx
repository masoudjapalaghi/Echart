import React from "react";
import { SqureSkeleton } from ".";

export const FieldSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-2">
      <SqureSkeleton height="h-3" width="w-10" />
      <SqureSkeleton height="h-10" width="w-full lg:w-52" />
    </div>
  );
};
