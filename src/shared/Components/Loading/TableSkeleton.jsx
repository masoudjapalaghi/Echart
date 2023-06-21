import React from "react";
import { DetailsSkeleton, SqureSkeleton, TitleSkeleton } from ".";
import { useMediaQuery } from "@hooks/useMediaQuery";

export const TableSkeleton = ({ pageSize }) => {
  const lgUp = useMediaQuery("lgUp");
  const arr = new Array(pageSize).fill(0);

  return (
    <div className="w-full">
      {lgUp ? (
        <div className="hidden lg:flex flex-col gap-4 w-full animate-pulse">
          <div className="bg-white h-10 w-full flex justify-evenly items-center">
            <TitleSkeleton width="w-2/12 md:w-10" />
            <TitleSkeleton width="w-2/12 md:w-10" />
            <TitleSkeleton width="w-2/12 md:w-10" />
            <TitleSkeleton width="w-2/12 md:w-10" />
            <TitleSkeleton width="w-2/12 md:w-10" />
          </div>
          <div className="flex  bg-white flex-wrap justify-evenly gap-10 py-12 px-4">
            {arr.map((item, index) => (
              <div key={index} className="w-full max-h-1  flex justify-evenly">
                <SqureSkeleton width="w-16" height="h-2" />
                <SqureSkeleton width="w-16" height="h-2" />
                <SqureSkeleton width="w-16" height="h-2" />
                <SqureSkeleton width="w-16" height="h-2" />
                <SqureSkeleton width="w-16" height="h-2" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className=" flex lg:hidden w-full  flex-col gap-2 ">
          <div className="bg-white  p-2  flex flex-col gap-4  animate-pulse">
            <div className="flex justify-between items-center gap-8">
              <div className="w-full">
                <DetailsSkeleton width="w-2/3" />
                <DetailsSkeleton width="w-2/3" />
              </div>
              <SqureSkeleton width="w-1/3" height="h-24" />
            </div>
            <div className="flex justify-evenly items-center">
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
            </div>
          </div>
          <div className="bg-white  p-2  flex flex-col gap-4  animate-pulse">
            <div className="flex justify-between items-center gap-8">
              <div className="w-full">
                <DetailsSkeleton width="w-2/3" />
                <DetailsSkeleton width="w-2/3" />
              </div>
              <SqureSkeleton width="w-1/3" height="h-24" />
            </div>
            <div className="flex justify-evenly items-center">
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
            </div>
          </div>
          <div className="bg-white  p-2  flex flex-col gap-4  animate-pulse">
            <div className="flex justify-between items-center gap-8">
              <div className="w-full">
                <DetailsSkeleton width="w-2/3" />
                <DetailsSkeleton width="w-2/3" />
              </div>
              <SqureSkeleton width="w-1/3" height="h-24" />
            </div>
            <div className="flex justify-evenly items-center">
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
            </div>
          </div>
          <div className="bg-white  p-2  flex flex-col gap-4  animate-pulse">
            <div className="flex justify-between items-center gap-8">
              <div className="w-full">
                <DetailsSkeleton width="w-2/3" />
                <DetailsSkeleton width="w-2/3" />
              </div>
              <SqureSkeleton width="w-1/3" height="h-24" />
            </div>
            <div className="flex justify-evenly items-center">
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
              <SqureSkeleton width="w-6" height="h-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
