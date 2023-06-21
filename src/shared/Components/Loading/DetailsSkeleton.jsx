export const DetailsSkeleton = ({Width ="w-full" ,height="h-2"}) => {
  return (
    <div className="grid grid-cols-2 w-full  gap-x-2 gap-y-1">
      <div className={`mt-2 ${Width} ${height} bg-gray-200 rounded`}/>
      <div className={`mt-2 ${Width} ${height} bg-gray-200 rounded`}/>
      <div className={`mt-2 ${Width} ${height} bg-gray-200 rounded`}/>
      <div className={`mt-2 ${Width} ${height} bg-gray-200 rounded`}/>
    </div>
  );
};
