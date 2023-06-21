import React from "react";
import { SqureSkeleton, TitleSkeleton, CircleSkeleton } from ".";

export const FieldGoodSeparatorProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse p-2 rounded-lg">
      <div className="flex  justify-between items-center w-full gap-4">
        <div className="flex gap-2 items-center">
          <SqureSkeleton width="w-10" height="h-14" />
          <div className="flex flex-col gap-2">
            <TitleSkeleton width="w-20" height="h-2" />
            <TitleSkeleton width="w-20" height="h-2" />
          </div>
        </div>
        <div className="flex gap-2">
          <CircleSkeleton width="w-10" height="h-10" />
        </div>
      </div>
      <div className="flex  justify-between items-center w-full gap-4">
        <div className="flex gap-2 items-center">
          <SqureSkeleton width="w-10" height="h-14" />
          <div className="flex flex-col gap-2">
            <TitleSkeleton width="w-20" height="h-2" />
            <TitleSkeleton width="w-20" height="h-2" />
          </div>
        </div>
        <div className="flex gap-2">
          <CircleSkeleton width="w-10" height="h-10" />
        </div>
      </div>
    </div>
  );
};
