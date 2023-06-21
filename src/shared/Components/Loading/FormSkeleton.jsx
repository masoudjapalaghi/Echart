import React from "react";
import { DetailsSkeleton, SqureSkeleton, TitleSkeleton, CircleSkeleton } from ".";

export const FormSkeleton = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <CircleSkeleton width="w-8" height="h-8" />
          <TitleSkeleton width="w-20" height="h-2" />
        </div>
        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
          <div className="flex flex-col gap-2 animate-pulse">
            <TitleSkeleton width="w-20" height="h-2" />
            <SqureSkeleton width="w-52" height="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
