export const ParagraphSkeleton = ({ width = "w-full", height = "h-3", bgColor = "bg-gray-200" }) => {
  return (
    <div className="grid grid-rows-2  gap-x-2 gap-y-1">
      <div className={`mt-2 ${width} ${height} ${bgColor} rounded`}></div>
      <div className={`mt-2 ${width} ${height} ${bgColor} rounded`}></div>
    </div>
  );
};
