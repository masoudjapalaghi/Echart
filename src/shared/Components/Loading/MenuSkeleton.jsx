import React from "react";
import { TitleSkeleton ,CircleSkeleton} from ".";

const MenuSkeleton = () => {
  return (
    <div className=" flex-col gap-4  animate-pulse overflow-x-hidden">
      <div className="bg-white flex flex-col gap-8 w-full  items-center justify-start ">
        <ul className="w-full">
          {[{},{},{},{},{},{}].map((item, indexParent) => {
            return (
                <li key={indexParent} className={`flex flex-col  gap-2 py-4 relative `}>
                  <div
                    className={`w-full flex items-end justify-between px-4 cursor-pointer font-semibold`}
                  >
                    <div className={`flex  gap-4 items-center`}>
                      <CircleSkeleton width="min-h-[16px]" height="min-w-[16px]"/>
                      <TitleSkeleton width="w-14" />
                     
                    </div>
                    <i
                      className={`fi fi-rr-angle-small-down text-xl  transition-all duration-75 `}
                    />
                  </div>
                  <span className="lineRadial" style={{ top: `${indexParent - 2}px` }} />
                </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuSkeleton;
