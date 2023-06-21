import { useEffect, useMemo, useState } from "react";
import { Direction } from "react-data-table-component";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
// Hook
import { useMediaQuery } from "@hooks/useMediaQuery";
// apiCall
import { useFetching } from "@services/axiosHelper";
// Componnets
import { TableSkeleton, ThreeLineSkeleton } from "@components/Loading";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { refetchTable } from "@slices/Table/RefechTable";
// Utils
import { emptyObj, isEmptyValue } from "src/utils";
// Styles
import { customStyles } from "./CustomStyle";

import TotalData from "./TotalData";
import { Pagination } from "@components/Pagination";
import SortComponentresopnsive from "./SortComponentresopnsive";
import { SortMobileMobile } from "@components/Button";

export const TableOtherStep = ({
  gap = 0,
  odd = false,
  hiddenHeader = false,
  hiddenpagination = false,
  cellPx = "10px",
  bgContainer = "#f5f5f5",
  nothingheight = "260px",
  singleCol,
  callBackTableDataFetch,
  sortDirection,
  refetchStatus,
  label = ["table"],
  totalData = {},
  lowerSkeleton,
  rowReverse = false,
  pageSizeDefault = 10,
  columns = [],
  freezeColumnCount = 0,
  freezeOperations = false,
  sortServer = true,
  decreaseHeight = "0",
  mb = "0",
  removeSelectFieldPageSize,
  sortColumnMobile = [],
  removeSortResponsive = false,
  ...rest
}) => {
  const lgUp = useMediaQuery("lgUp");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState({});

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    refetch,
    isFetched,
    remove,
  } = useFetching(label, () => {
    return callBackTableDataFetch(currentPage, pageSize, sort);
  });

  const dataTable = res.entity;
  const status = res.status === 1;

  let statusData = !isEmptyValue(dataTable);
  const handleReFetch = () => {
    remove();
  };

  // handle refetch data Table
  useEffect(() => {
    refetchStatus && refetch();
  }, [refetchStatus]);

  // handle Sort
  const handleSort = (column, sortDirection) => {
    const sortField = column.sortField;
    setSort({
      SortDir: sortDirection,
      Sort: sortField,
    });
    if (!emptyObj(sort)) {
      handleReFetch();
    }
  };

  const handlePageClick = async (e) => {
    await setCurrentPage(e);
    await refetch();
  };

  const getAllSort = sortColumnMobile.map((item) => item.sortable);
  const isSortresponsive = getAllSort.some((item) => item === true);
  return (
    <div className="flex flex-col gap-4 justify-between lg:h-96">
      {removeSortResponsive ||
        (!lgUp && isSortresponsive && (
          <SortMobileMobile handleSort={handleSort} sortColumnMobile={sortColumnMobile}/>
        ))}
      <DataTable
        direction={Direction.RTL}
        progressPending={isFetching}
        customStyles={customStyles(
          singleCol,
          lgUp,
          gap,
          odd,
          hiddenHeader,
          cellPx,
          rowReverse,
          freezeColumnCount,
          freezeOperations,
          mb
        )}
        noDataComponent={status ? "موردی برای نمایش وجود ندارد" : "مشکلی پیش آمده مجددا تلاش کنید"}
        progressComponent={lowerSkeleton ? <ThreeLineSkeleton /> : <TableSkeleton pageSize={pageSize} />}
        data={dataTable ? dataTable : []}
        onSort={(column, sortDirection) => sortServer && handleSort(column, sortDirection)}
        sortServer={sortServer}
        {...rest}
        columns={columns}
      />
      {!hiddenpagination && dataTable && res.total ? (
        <Pagination
          allRowCount={res.total}
          rowsPerPage={pageSize}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          setRowsPerPage={setPageSize}
          isRefetch={!isLoading && isFetching}
          staticPagesize
          removeSelectFieldPageSize
        />
      ) : null}
      <TotalData totalData={totalData} columns={columns} />
    </div>
  );
};
