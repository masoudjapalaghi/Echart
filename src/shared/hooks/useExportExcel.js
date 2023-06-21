import * as XlSX from "xlsx";
import { useEffect, useState } from "react";
import { emptyArray } from "src/utils";
import { useFetching } from "@services/axiosHelper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const useExportExcel = (
  label = ["excel"],
  callbackObjectFormat = () => {},
  callBackExportDataFetch = () => {},
  comparisonFactor = "id"
) => {
  const [currentPage, setCurrentPage] = useState(null);
  const [finalData, setFinalData] = useState([]);
  const [reset, setReset] = useState(false);
  const { queryString } = useSelector((state) => state.queryStringTable);

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    isFetched,
    remove,
    refetch,
  } = useFetching(label, () => callBackExportDataFetch(currentPage, 100, 1,queryString), {
    enabled: false,
  });
  const {asPath,push,basePath} = useRouter()
  const exportLeadsResponseData = res.entity ? res.entity : [];
  const total = res.total;
  const totalLeftOver = total - currentPage * 100;
  const itIsAPage = total < 100;
  const lengthPage = itIsAPage ? Math.ceil(totalLeftOver / 100) : Math.ceil(totalLeftOver / 100) + 1;
  // const Percentage = lengthPage / 10 ; 
  const status = res.status;

  const newData = finalData.map((item) => {
    return callbackObjectFormat(item);
  });

  const handleExport = async () => {
    await setCurrentPage(1);
    refetch();
  };
  const handleReset = () => {
    setFinalData([]);
    setCurrentPage(null);
    remove();
    // push(basePath)
  };
  const exportExcelHandler = async () => {
    var wb = XlSX.utils.book_new();
    var ws = XlSX.utils.json_to_sheet(newData);
    XlSX.utils.book_append_sheet(wb, ws, "Mysheet");
    XlSX.writeFile(wb, "MyExcel.csv");
  };
  const getTotalData = () => {
    if (status && currentPage > 1) {
      setCurrentPage((prev) => {
        return prev + 1;
      });
      remove();
      refetch();
    } else {
      setCurrentPage((prev) => {
        return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (lengthPage > 0 && currentPage) {
      getTotalData();
    }
    if (currentPage) {
      const prevAndNewMerged = [...finalData, ...exportLeadsResponseData];
      const unique = [...new Map(prevAndNewMerged.map((m) => [m[comparisonFactor], m])).values()];
      setFinalData([...unique]);
    }
  }, [lengthPage]);

  useEffect(() => {
    if (lengthPage === 0) {
      exportExcelHandler();
      setReset(true);
    }
  }, [finalData]);

  useEffect(() => {
    if (reset) {
      handleReset();
      setReset(false);
    }
  }, [reset]);
  return [handleExport, isFetching, res,lengthPage];
};

export default useExportExcel;
