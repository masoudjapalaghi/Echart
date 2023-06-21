import { SqureSkeleton } from ".";

export const ChartSkeleton = () => {
  const arr = new Array(50).fill(0);
  return (
    <div className="flex flex-col gap-14 animate-pulse ">
      <div className="flex flex-col gap-2">
        <div className="flex  justify-between items-end   h-[450px] p-2 border-l-2 border-b-2 border-gray-600 ">
          {arr.map((item, index) => (
            <div key={index} className="flex gap-1 items-end">
              <SqureSkeleton width="w-2" height={`h-${index + 3}`} />
              <SqureSkeleton width="w-2" height={`h-${index + 40}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {arr.map((item, index) => (
            <SqureSkeleton width="w-2" height="h-14" className={` rotate-[60deg] `} />
          ))}
        </div>
      </div>
      <SqureSkeleton width="w-full" height="h-10" />
    </div>
  );
};
