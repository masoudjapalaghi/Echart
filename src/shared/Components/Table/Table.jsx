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
import {
  addToQueryString,
  allAreTrue,
  emptyArray,
  emptyObj,
  HandleTotalCountDynamicArray,
  isEmptyValue,
} from "src/utils";
// Styles
import { customStyles } from "./CustomStyle";

import TotalData from "./TotalData";
import useFetchBasedOnQuery from "@hooks/useFetchBasedOnQuery";
import { useRouter } from "next/router";
import { setColumnsTable } from "@slices/Table/ColumnsTable";

export const Table = ({
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
  lowerSkeleton,
  rowReverse = false,
  pageSizeDefault = 10,
  columns = [],
  freezeColumnCount = 0,
  freezeOperations = false,
  sortServer = true,
  decreaseHeight = "0",
  mb = "10px",
  staticPagesize = false,
  countStaticPageSize = 5,
  totalData = {},
  mobileTotalCard = null,
  manualCollection = false,
  removeOprationCulumnInManualCollection = false,
  setResetOtherStatus = () => {},
  removeSelectFieldPageSize,
  sortColumnMobile = [],
  removeSortResponsive = false,
  requiredFieldForFetch = true,
  ...rest
}) => {
  const lgUp = useMediaQuery("lgUp");
  const [pageSize, setPageSize] = useState(null);

  const { query, isReady } = useRouter();

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    refetch,
  } = useFetching(label, () => callBackTableDataFetch(pageSize, queryString), {
    enabled: false,
  });
  const dataTable = res.entity;
  const status = res.status === 1;

  let statusData = !isEmptyValue(dataTable);

  const handleReFetch = () => {
    refetch();
  };

  const finalRequiredFieldForFetch = pageSize && requiredFieldForFetch;

  const [queryString] = useFetchBasedOnQuery(handleReFetch, finalRequiredFieldForFetch);

  const dispatch = useDispatch();

  // handle refetch data Table
  useEffect(() => {
    refetchStatus && handleReFetch();
  }, [refetchStatus]);

  // handle Sort
  const handleSort = async (column, sortDirection) => {
    const Sort = column.sortField;
    if (Sort) {
      addToQueryString({ SortDir: sortDirection, Sort }, query);
    }
  };

  const ReceiveBasedOnHeight = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const finalHeight = height - 230 - decreaseHeight;
    if (width > 1024 && !staticPagesize && !pageSize) {
      const heightRow = 48;
      const rowsCount = Math.floor(finalHeight / heightRow) - 1;
      if (rowsCount > 0) {
        setPageSize(rowsCount);
      } else {
        setPageSize(1);
      }
    } else {
      !pageSize && setPageSize(countStaticPageSize);
    }
    if (pageSize && isReady) {
      refetch();
    }
  };
  useEffect(() => {
    ReceiveBasedOnHeight();
  }, [pageSize]);

  const handlePageClick = async (e) => {
    addToQueryString({ currentPage: e }, query);
  };

  const manualCalculateTotal = HandleTotalCountDynamicArray(res.entity instanceof Array ? res.entity : []);

  const finalSortMobile = sortColumnMobile.map((item) => {
    return {
      name: item.name,
      sortField: item.sortField,
      sortable: item.sortable,
    };
  });
  useEffect(() => {
    dispatch(setColumnsTable(finalSortMobile));
  }, []);

  return (
    <>
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
      {!hiddenpagination && res.total && res.total > 1 ? (
        <Pagination
          staticPagesize={staticPagesize}
          allRowCount={res.total}
          rowsPerPage={pageSize}
          currentPage={+query.currentPage ? +query.currentPage : 1}
          handlePageClick={handlePageClick}
          setRowsPerPage={setPageSize}
          isRefetch={!isLoading && isFetching}
          removeSelectFieldPageSize={removeSelectFieldPageSize}
        />
      ) : null}
      {!emptyObj(totalData) ? (
        <TotalData
          totalData={totalData}
          columns={columns}
          mobileTotalCard={mobileTotalCard}
          removeOprationCulumnInManualCollection={removeOprationCulumnInManualCollection}
        />
      ) : null}
      {manualCollection ? (
        <TotalData
          totalData={manualCalculateTotal}
          columns={columns}
          mobileTotalCard={mobileTotalCard}
          removeOprationCulumnInManualCollection={removeOprationCulumnInManualCollection}
        />
      ) : null}
    </>
  );
};
