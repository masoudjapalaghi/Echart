import React from "react";
import { DetailsSkeleton, SqureSkeleton, TitleSkeleton, CircleSkeleton } from ".";

export const FieldFeatureSeparatorProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col flex-wrap gap-4 ">
        <div className="flex gap-2 flex-wrap items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
          <div className="flex gap-2">
            <SqureSkeleton width="w-52" height="h-10" />
            <SqureSkeleton width="w-10" height="h-10" />
          </div>
          <SqureSkeleton width="w-20" height="h-10" />
          <SqureSkeleton width="w-20" height="h-10" />
          <SqureSkeleton width="w-20" height="h-10" />
          
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-4 ">
        <div className="flex gap-2 flex-wrap items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
          <div className="flex gap-2">
            <SqureSkeleton width="w-52" height="h-10" />
            <SqureSkeleton width="w-10" height="h-10" />
          </div>
          <SqureSkeleton width="w-20" height="h-10" />
          <SqureSkeleton width="w-20" height="h-10" />
          <SqureSkeleton width="w-20" height="h-10" />
          
        </div>
      </div>
    </div>
  );
};
