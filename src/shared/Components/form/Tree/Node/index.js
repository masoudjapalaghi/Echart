import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedItems,
  setSelectedItemsArray,
} from "@slices/TreeSelect/TreeSelect";
import { DotPulse, Spinner } from "@components/Loading";
import { toast } from "react-toastify";
const Node = ({
  item,
  hasChildren,
  level,
  onToggle,
  selected,
  id,
  isFetched,
  isMulti,
  checkParent = true,
}) => {
  const dispatch = useDispatch();
  const itemsSelector = useSelector(
    (state) => state.selectedItems.selectedItemsArray
  );

  const getValueHandler = (e) => {
    e.stopPropagation();
    const removeDuplicates = itemsSelector.filter((selectedItem) => {
      console.log()
      return item.id == selectedItem.id 
    });
    if (item.parent?.id == undefined) {
      var isSelectedItem = itemsSelector.filter((selectedItems) => {
        if (item.id == selectedItems.parentId ) {
          return item.id == selectedItems.parentId;
        }
      });
    } else {
      var isSelectedItem = itemsSelector.filter((selectedItems) => {
        if (item.id == selectedItems.parentId) {
      return item.id == selectedItems.parentId
        }
        return item.parent?.id === selectedItems.id
      });
    }
    
    if (checkParent) {
      if (isMulti && removeDuplicates == 0 && !isSelectedItem.length > 0) {
        dispatch(
          setSelectedItemsArray({
            name: item.name,
            id: item.id,
            parentId: item.parent?.id ?? null,
          })
        );
      } else {
        dispatch(
          setSelectedItems({
            name: item.name,
            id: item.id,
            parentId: item.parent?.id ?? null,
          })
          );
        }
        if (isSelectedItem.length > 0 && checkParent) {
          toast.warn("فقط یک دسته بندی از بین پدر و فرزند میتواند انتخاب شود");
        }
      } else if (removeDuplicates == 0 && !isSelectedItem.length > 0) {
        dispatch(
          setSelectedItemsArray({
            name: item.name,
            id: item.id,
            parentId: item.parent?.id ?? null,
          })
          );
        }
      };
      
      
  return (
    <>
      <div className="flex flex-row-reverse w-auto justify-end items-center">
        <div
          className="text-sm cursor-pointer"
          onClick={(e) => getValueHandler(e)}
        >
          {item.name}
        </div>
        {isFetched ? (
          <button
            type="button"
            className="w-3 h-3 bg-pink-100 flex justify-center items-center text-center text-small rounded-sm ml-2"
            onClick={(e) => onToggle(e, item.id)}
            style={{ marginRight: `${level * 12}px` }}
          >
            {selected ? "-" : "+"}
          </button>
        ) : // <Spinner width="w-[1px]" height="h-[1px]" />
        null}
      </div>
    </>
  );
};

export default Node;
