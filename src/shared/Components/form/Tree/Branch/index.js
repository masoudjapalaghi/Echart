import { productCategoriesProxy } from "@services/api";
import { useFetching } from "@services/axiosHelper";
import React, { useEffect, useState } from "react";
import Node from "../Node";

const Branch = ({ item, level,isMulti,checkParent }) => {
  const [parentId, setParentId] = useState(null);
  const [fetchedId, setFetchedId] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!fetchedId.includes(parentId)) {
      refetch();
    }
  }, [parentId]);

  const hasChildren = item.hasChild;
  const { productCategoriesById, isLoading, isFetched, refetch, remove } = useFetching(["productCategoriesById",parentId], () =>
    productCategoriesProxy.getCategoriesListSelect(parentId)
  );
  const categoriesByIdStatus = productCategoriesById.status === 1;
  const categoriesByIdEntity = productCategoriesById.entity ? productCategoriesById.entity : [];
  const renderBranches = () => {
    if (hasChildren) {
      const newLevel = level + 1;

      return categoriesByIdEntity.map((child) => {
        return <Branch checkParent={checkParent} isMulti={isMulti} key={child.id} item={child} level={newLevel} />;
      });
    }

    return null;
  };
  const toggleSelected = (e,id) => {
    e.stopPropagation()
    setParentId(id);
    setFetchedId((prev) => [...prev, id]);
    setSelected((prev) => !prev);
  };
  return (
    <div className="max-w-max">
      <Node isMulti={isMulti} checkParent={checkParent} isFetched={isFetched} item={item} selected={selected} hasChildren={hasChildren} level={level} onToggle={toggleSelected} />
      {selected && renderBranches()}
    </div>
  );
};

export default Branch;
