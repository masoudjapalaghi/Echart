import Tree from "@components/form/Tree";
import useToggle from "@hooks/useToggle";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "@hooks/useClickedOutside";
import { emptyObj } from "src/utils";
import { setDeletedItemsArray, setSelectedItemsArray, setSelectedResetArray } from "@slices/TreeSelect/TreeSelect";
const TreeSelectParent = ({ title, isMulti, dropDownWidth,outline,width="w-full",checkParent }) => {
  const selector = useSelector((state) => state.selectedItems.selectedItems);
  const itemsSelector = useSelector((state) => state.selectedItems.selectedItemsArray);

  const [openDropDown, setOpenDropDown] = useToggle();
  const ref = useRef();
  const openDropDownHandler = () => {
    setOpenDropDown();
  };

  const dispatch = useDispatch();
  useOnClickOutside(ref, setOpenDropDown, openDropDown);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    const newArray = itemsSelector.filter((item) => {
      return item.id !== id;
    });
    dispatch(setDeletedItemsArray(newArray));
  };
  return (
    <div onClick={openDropDownHandler} className={`flex flex-col gap-2 ${width}`} ref={ref}>
      {/* <TreeSelectInput/> */}
      <label className={`text-xs ${width} px-1`}>{title}:</label>
      <div
        className={`bg-white rounded-md flex flex-wrap justify-between relative items-start min-h-[40px] max-h-min ${width} ${outline?"border border-[#e0e0e0]":""}`}
      >
        <div className="max-h-min ">
          <div
            className="flex gap-4 flex-wrap w-full p-1 items-center max-h-min relative"
            onClick={openDropDownHandler}
          >
            {isMulti ? (
              itemsSelector.map((item) => (
                <div key={item.id} className="flex gap-2 bg-bg text-black p-1 rounded-sm">
                  <p className="text-xs text-black">{item.name}</p>

                  {isMulti ? (
                    <i className="fi fi-rr-cross-small bg-white px-1" onClick={(e) => handleDelete(e, item.id)} />
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <>
                {selector?.name ? (
                  <p className="text-xs text-black mt-2">{selector.name}</p>
                ) : (
                  <p className="text-xs text-[#808080] mt-2">انتخاب کنید</p>
                )}
              </>
            )}
          </div>
        </div>
        <Tree
        checkParent={checkParent}
          isMulti={isMulti}
          className={`absolute w-full h-0  -bottom-[220px] ${
            openDropDown ? "h-52 min-h-max p-4 drop-shadow-lg " : ""
          }`}
        />

        {openDropDown ? (
          <i className="fi fi-rr-angle-down text-xs font-bold border-r-[1px] pr-2 h-5 text-[#808080] hover:text-black absolute top-2 left-2"></i>
        ) : (
          <i className="fi fi-rr-angle-up text-xs font-bold border-r-[1px] pr-2 h-5 text-[#808080] hover:text-black absolute top-2 left-2"></i>
        )}
      </div>
    </div>
  );
};

export default TreeSelectParent;
