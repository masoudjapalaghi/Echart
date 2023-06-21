import { SqureSkeleton } from ".";

export const ListSkeleton = () => {
  const arr = new Array(30).fill(0);
  return (
    <div className="flex flex-col gap-14 animate-pulse ">
      <div className="flex flex-col gap-4">
        {arr.map((item, index) => (
          <div key={index} className="flex gap-1 items-end">
            <SqureSkeleton width="w-full" height="h-10" />
          </div>
        ))}
      </div>
    </div>
  );
};
