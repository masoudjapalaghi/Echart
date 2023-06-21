export const CustomStyleWithoutData = (singleCol, lgUp, gap, odd, hiddenHeader, cellPx, nothingheight) => {
  return {
    responsiveWrapper: {
      style: {
        overflow:"auto",
        backgroundColor:"red"

      },
    },
    table: {
      style: {
        backgroundColor: "#f5f5f5",
        fontSize: "12px!important",
        height: "100%",
      },
    },
    rows: {
      style: {
        display: singleCol && !lgUp && "inline-block",
        borderBottomWidth: "0!important",
        fontFamily: "iranyekanBold",
        fontSize: "12px!important",
        marginBottom: !lgUp && gap,
        "&:nth-of-type(odd)": {
          backgroundColor: lgUp || odd ? "#FFFBF9" : "#fff",
        },
        "&:hover": {
          border: "0.5px solid #F47920 !important",
        },
      },
    },

    headRow: {
      style: {
        display: hiddenHeader && !lgUp && "none",
        borderBottomWidth: "0",
        marginBottom: "16px",
        backgroundColor: lgUp ? "white" : "transparent",
        color: lgUp ? "#A6A6A6" : "#000",
        "& .gnetL": {
          opacity: "1!important",
        },
      },
    },
    headCells: {
      style: {
        "& div": {
          overflow: "unset!important",
          whiteSpace: "unset!important",
          textOverflow: "unset!important",
          textAlign: "center",
          lineHeight: "1.5rem",
        },
      },
    },
    cells: {
      style: {
        padding: !lgUp && cellPx,
      },
    },
    pagination: {
      style: {
        backgroundColor: "transparent",
        borderTopWidth: "0",
        justifyContent: "space-between",
        flexDirection: "row-reverse",
        padding: "0",
      },
      pageButtonsStyle: {
        width: "unset",
        height: "unset",
        padding: "4px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "0.4s",
        color: "#F47920",
        fill: "#F47920",

        backgroundColor: "transparent",

        "&:hover:not(:disabled)": {
          backgroundColor: "#F47920",
        },
        "&:focus": {
          outline: "none",
          backgroundColor: "#F47920",
          fill: "white",
          borderRadius: "6px",
        },
      },
    },
    progress: {
      style: {
        backgroundColor: "transparent",
      },
    },
    noData: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
      },
    },
  };
};
