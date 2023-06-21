import * as XlSX from "xlsx";
import { useEffect } from "react";
import { useFetching } from "@services/axiosHelper";
import { useSelector } from "react-redux";
import { csvToArray } from "src/utils";

const useExportExcelallTogether = (label = ["excel"], callBackExportDataFetch = () => {}, isCsvFormat = false) => {
  const { queryString } = useSelector((state) => state.queryStringTable);

  const {
    [label[0]]: res,
    isLoading,
    isFetching,
    isFetched,
    remove,
    refetch,
  } = useFetching(label, () => callBackExportDataFetch(queryString), {
    enabled: false,
  });

  if (isCsvFormat) {
    var dataCsv = csvToArray(res.entity);
  } else {
    var data = JSON.parse(res?.entity);

    var newData = data?.map((item) => {
      return item;
    });
  }
  const handleExport = async () => {
    refetch();
  };

  const exportExcelHandler = async () => {
    var wb = XlSX.utils.book_new();
    var ws = isCsvFormat ? XlSX.utils.json_to_sheet(dataCsv) : XlSX.utils.json_to_sheet(newData);
    XlSX.utils.book_append_sheet(wb, ws, "Mysheet");
    XlSX.writeFile(wb, `${label}.csv`);
  };

  useEffect(() => {
    if (isFetched) {
      exportExcelHandler();
      remove();
    }
  }, [isFetched]);

  return [handleExport, isFetching];
};

export default useExportExcelallTogether;
