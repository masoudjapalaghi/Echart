export const SqureSkeleton = ({children, width="w-full", height = "h-40",bgColor ="bg-gray-200",className = "" }) => {
    return <div className={`rounded-lg ${bgColor} ${width} ${height} ${className}`} >{children}</div>;
  };
  