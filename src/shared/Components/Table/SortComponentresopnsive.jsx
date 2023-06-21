import React, { useState } from "react";

const SortComponentresopnsive = ({handleSort,sortColumnMobile}) => {
  const [toggle, setToggle] = useState(false);
  const [activeSort, setActiveSort] = useState(null);

  const HandleClick = async (item, index) => {
    await setToggle((prev) => !prev);
    await setActiveSort(index);
    const sortDir = toggle ? "desc" : "asc";
    handleSort(item, sortDir);
  };

  return (
    <div className="flex bg-white  rounded-t-md text-small mb-2">
      <span className="border-l-2 p-3">
        <i className="fi fi-rr-apps-sort" />
      </span>
      <div className="flex gap-8 overflow-auto items-center p-2 px-6">
        {sortColumnMobile.map((item, index) => {
          if (item.sortable) {
            return (
              <span key={index} className="flex items-center gap-1" onClick={() => HandleClick(item, index)}>
                <i
                  className={`fi fi-sr-caret-down opacity-20 transition-all ${
                    activeSort === index ? " opacity-100" : ""
                  } ${toggle && activeSort === index ? "rotate-180" : ""}`}
                />
                <span className={`whitespace-nowrap  ${activeSort === index ? " opacity-100" : "opacity-50"}`}>
                  {item.name}
                </span>
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SortComponentresopnsive;
