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
import { Pagination } from "@components/Pagination";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { refetchTable } from "@slices/Table/RefechTable";
// Utils
import { addToQueryString, emptyObj, isEmptyValue } from "src/utils";
// Styles
import { customStyles } from "./CustomStyle";
import useToggle from "@hooks/useToggle";
import TotalData from "./TotalData";
import { useRouter } from "next/router";
import { setQueryString } from "@slices/Table/QueryStringTable";
////////////////////////////////////////////////////////
//////////////////////////////////////
/////////////// most use in Discount and Sale
//////////////////////////////////////
////////////////////////////////////////////////////////
export const TableWithoutHook = ({
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
  sortServer = true,
  rowReverse = false,
  pageSizeDefault = 10,
  columns = [],
  freezeColumnCount = 0,
  freezeOperations = false,
  handleRefetchTable,
  ...rest
}) => {
  const lgUp = useMediaQuery("lgUp");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [sort, setSort] = useState("");

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    isFetched,
    refetch,
  } = useFetching(
    label,
    () =>
      callBackTableDataFetch(
        currentPage,
        pageSize,
        sort ?? "",
        query,
      )
  );
  const { query } = useRouter();
  const dataTable = res.entity;
  let statusData = !isEmptyValue(dataTable);

  const dispatch = useDispatch();
  // handle reftch
  const { refetchTabelByClick } = useSelector((state) => state.refechTable);
  // handel search field
  let refetchStatusFinally = refetchStatus  || refetchTabelByClick;

  useMemo(() => {
    isFetching && dispatch(refetchTable(false));
  }, [isFetching]);


  // handle Sort
  const handleSort = async (column, sortDirection) => {
    const Sort = column.sortField;
    if (Sort) {
      setSort({ dir: sortDirection, name:column.sortField });
    }
  };
  useMemo(()=>{
    refetch()
  },[sort])

  // handle refetch data Table
  useMemo(() => {
    refetchStatusFinally && refetch();
  }, [refetchStatusFinally]);

  // useEffect(() => {
  // localStorage.setItem("currentPage", currentPage);
  // const width = window.innerWidth;
  // if (width > 1024) {
  //   const table = document.getElementsByClassName("table");
  //   const heightTable = table[0]?.getBoundingClientRect().height;
  //   const heightRow = 48;
  //   const rowsCount = Math.floor(heightTable / heightRow) - 2;
  //   setPageSize(rowsCount);
  // refetch();
  // }
  // }, [currentPage, pageSize]);

  const handlePageClick = async (e) => {
    await setCurrentPage(e);
    await refetch();
  };

  return (
    <div className="flex flex-col gap-2">
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
          rowReverse,
          freezeColumnCount,
          freezeOperations
        )}
        noDataComponent="موردی برای نمایش وجود ندارد ؟!"
        progressComponent={lowerSkeleton ? <ThreeLineSkeleton /> : <TableSkeleton pageSize={5} />}
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
        />
      ) : null}
      <TotalData totalData={totalData} columns={columns} />
    </div>
  );
};
