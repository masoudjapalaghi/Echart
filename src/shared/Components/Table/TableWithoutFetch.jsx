import { useEffect, useState } from "react";
import { Direction } from "react-data-table-component";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
// Hook
import { useMediaQuery } from "@hooks/useMediaQuery";
// Styles
import { CustomStyleWithoutData } from "./CustomStyleWithoutData";
import { customStyles } from "./CustomStyle";

export const TableWithoutFetch = ({
  gap = 0,
  odd = false,
  hiddenHeader = false,
  cellPx = "10px",
  bgContainer = "#f5f5f5",
  singleCol,
  dataTable,
  sortDirection,
  label = "table",
  isLoading,
  ...rest
}) => {
  const lgUp = useMediaQuery("lgUp");

  return (
    <div className="table h-full w-full lg:relative">
      <DataTable
        direction={Direction.RTL}
        progressPending={isLoading}
        customStyles={customStyles(
          singleCol,
          lgUp,
          gap,
          odd,
          hiddenHeader,
          cellPx,
        )}
        noDataComponent="موردی برای نمایش وجود ندارد ؟!"
        data={dataTable ? dataTable : []}
        {...rest}
      />
    </div>
  );
};
