import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Direction } from "react-data-table-component";
import dynamic from "next/dynamic";
const DataTable = dynamic(() => import("react-data-table-component"), {
  ssr: false,
});
// Hook
import { useMediaQuery } from "@hooks/useMediaQuery";
import useFetchBasedOnQuery from "@hooks/useFetchBasedOnQuery";
// apiCall
import { useFetching } from "@services/axiosHelper";
// Componnets
import { TableSkeleton, ThreeLineSkeleton } from "@components/Loading";
import { Pagination } from "@components/Pagination";
import TotalData from "./TotalData";
// Utils
import { addToQueryString, emptyObj, isEmptyValue } from "src/utils";
// Styles
import { customStyles } from "./CustomStyle";
import ToolTipForLargeTexts from "@components/Tooltip/ToolTipForLargeTexts";

export const TableSecondary = ({
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
  sortServer = true,
  decreaseHeight = "0",
  staticPagesize = false,
  mb = "0",
  removeSelectFieldPageSize,
  ...rest
}) => {
  const lgUp = useMediaQuery("lgUp");
  const [pageSize, setPageSize] = useState(null);
  const { isReady } = useRouter();

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    isFetched,
    refetch,
    remove,
  } = useFetching(label, () => callBackTableDataFetch(pageSize, queryStrings), {
    enabled: false,
  });

  // const { queryString } = useSelector((state) => state.queryStringTable);

  const dataTable = res.entity?.leadsList ? res.entity?.leadsList : [];
  const totalQuestions = res.entity?.questions ? res.entity?.questions : [];
  let statusData = !isEmptyValue(dataTable);

  const DataTableSerialize = dataTable.map((item, index) => {
    const questionAndAnswers = item.questionAndAnswers.map((q, i) => {
      return {
        [q.question]: q.option,
      };
    });
    const merageAllQuestioninObject = questionAndAnswers.reduce(function (result, current) {
      return Object.assign(result, current);
    }, {});
    return {
      name: item.name,
      city: item.city,
      area: item.area,
      ...item,
      ...merageAllQuestioninObject,
    };
  });

  const createColumnQuestion = totalQuestions.map((item, index) => {
    const lengthRow = item.length;
    return {
      name: item,
      selector: (row) => {
        const rowKeys = Object.keys(row);
        const value = "";
        rowKeys.forEach((element, i) => {
          if (item == element) {
            value = Object.values(row)[i];
          }
        });
        return <ToolTipForLargeTexts title={value} avrageLength={5} className="cursor-pointer " />;
      },
      center: true,
      width: `${lengthRow * 10}px`,
    };
  });

  const customColumn = [...columns, ...createColumnQuestion];

  const handleReFetch = () => {
    refetch();
  };

  // handle refetch data Table
  useEffect(() => {
    refetchStatus && refetch();
  }, [refetchStatus]);

  const [queryStrings] = useFetchBasedOnQuery(handleReFetch);

  // handle Sort
  const handleSort = async (column, sortDirection) => {
    const Sort = column.sortField;
    if (Sort) {
      addToQueryString({ SortDir: sortDirection, Sort });
    }
  };

  const ReceiveBasedOnHeight = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const finalHeight = height - 220 - decreaseHeight;
    if (width > 1024) {
      const heightRow = 48;
      const rowsCount = Math.floor(finalHeight / heightRow) - 1;
      setPageSize(rowsCount);
    } else {
      setPageSize(5);
    }
    if (pageSize && isReady) {
      refetch();
    }
  };
  useEffect(() => {
    ReceiveBasedOnHeight();
  }, [pageSize]);

  const handlePageClick = async (e) => {
    let objectFinally = { ...queryStrings, currentPage: e };
    addToQueryString(objectFinally);
  };
  return (
    <>
      <DataTable
        direction={Direction.RTL}
        progressPending={isFetching}
        customStyles={customStyles(singleCol, lgUp, gap, odd, hiddenHeader, cellPx, rowReverse, freezeColumnCount)}
        noDataComponent="موردی برای نمایش وجود ندارد ؟!"
        progressComponent={lowerSkeleton ? <ThreeLineSkeleton /> : <TableSkeleton pageSize={pageSize} />}
        data={DataTableSerialize ? DataTableSerialize : []}
        onSort={handleSort}
        sortServer
        {...rest}
        columns={customColumn}
      />
      {/* {!hiddenpagination && dataTable && res.total ? ( */}
      <Pagination
        staticPagesize={staticPagesize}
        allRowCount={res.total}
        rowsPerPage={pageSize}
        currentPage={queryStrings.currentPage ? +queryStrings.currentPage : queryStrings.currentPage}
        handlePageClick={handlePageClick}
        setRowsPerPage={setPageSize}
        isRefetch={!isLoading && isFetching}
        isFetched={isFetched}
        removeSelectFieldPageSize={removeSelectFieldPageSize}
      />
      {/* ) : null}  */}
      <TotalData totalData={totalData} columns={columns} />
    </>
  );
};
