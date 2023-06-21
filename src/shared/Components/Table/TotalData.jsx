import { useMediaQuery } from "@hooks/useMediaQuery";
import React from "react";
import DataTable, { Direction } from "react-data-table-component";
import { emptyObj } from "src/utils";

const TotalData = ({ totalData = {}, columns, mobileTotalCard, removeOprationCulumnInManualCollection }) => {
  const lgup = useMediaQuery("lgUp");

  const removeFirstField = columns.filter((item, index) => index !== 0);
  const removeLastAndFirstField = columns.filter((item, index) => index !== 0 && index !== columns.length - 1);
  const editLastColumn = { name: "empty" };
  const editColumn = [...removeLastAndFirstField, editLastColumn];

  const firstColumn = columns.filter((item, index) => index === 0);
  const filterFirstColumn = firstColumn.map((item, index) => {
    return {
      grow: item?.grow,
      width: item?.width,
    };
  })[0];
  const addTotalToColumn = [
    {
      name: "ردیف",
      selector: (row, index) => <div className="font-iranyekanBold text-base">مجموع</div>,
      center: true,
      ...filterFirstColumn,
    },
    ...(removeOprationCulumnInManualCollection ? editColumn : removeFirstField),
  ];

  if (emptyObj(totalData)) {
    return null;
  }
  const ElementProps = mobileTotalCard ? { ...mobileTotalCard, props: { ...mobileTotalCard.props, totalData } } : {};

  return (
    <>
      {lgup ? (
        <DataTable
          direction={Direction.RTL}
          customStyles={{
            headRow: {
              style: {
                display: "none",
              },
            },
            cells: {
              style: {
                padding: "15px",
                // border:"1px solid gray"
              },
            },
            rows: {
              style: {
                height: "40px",
                // borderRadius: "8px",
              },
            },
            table: {
              style: {
                // border: "1px solid #404040",
                borderRadius: "8px",
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              },
            },
          }}
          noDataComponent="موردی برای نمایش وجود ندارد ؟!"
          data={[totalData]}
          columns={addTotalToColumn}
        />
      ) : (
        <>{ElementProps}</>
      )}
    </>
  );
};

export default TotalData;
