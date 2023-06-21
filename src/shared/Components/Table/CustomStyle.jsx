export const customStyles = (
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
) => {
  return {
    responsiveWrapper: {
      style: {
        // width:"100%",
        overflow: "auto",
        marginBottom: mb,
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
        display: "flex",
        flexDirection: rowReverse ? "row-reverse" : "row",
        borderBottomWidth: "0!important",
        fontFamily: "iranyekanBold",
        fontSize: "12px!important",
        marginBottom: !lgUp && gap,
        justifyContent: "space-between",
        "&:nth-of-type(odd)": {
          backgroundColor: lgUp || odd ? "#FFFBF9" : "#fff",
        },
        "&:hover": {
          border: "0.5px solid #F47920 !important",
        },
      },
    },
    expanderRow: {
      style: {
        // color: "red",
        // backgroundColor: theme.background.default,
      },
    },
    expanderCell: {
      style: {
        transform: "rotate(180deg)",
        flex: 1,
        margin: !lgUp && "15px",
      },
    },
    expanderButton: {
      style: {
        svg: {
          margin: "0",
        },
      },
    },
    head: {
      style: {
        zIndex: "2!important",
      },
    },
    headRow: {
      style: {
        display: hiddenHeader && !lgUp && "none",
        flexDirection: rowReverse ? "row-reverse" : "row",
        // overflow: "hidden",
        borderBottomWidth: "0",
        marginBottom: "16px",
        backgroundColor: lgUp ? "white" : "transparent",
        color: lgUp ? "#A6A6A6" : "#000",
        "& .gnetL": {
          // opacity: ".1!important",
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
        zIndex: 1,
        "&:nth-of-type(1)": {
          position: freezeColumnCount > 0 && "sticky",
          right: freezeColumnCount > 0 && 0,
          zIndex: freezeColumnCount > 0 && 2,
          backgroundColor: lgUp && freezeColumnCount > 0 && "#fff",
        },
        "&:nth-of-type(2)": {
          position: freezeColumnCount > 1 && "sticky",
          right: freezeColumnCount > 1 && "107px",
          backgroundColor: freezeColumnCount > 1 && "#fff",
          zIndex: lgUp && freezeColumnCount > 1 && 2,
        },
        "&:nth-of-type(3)": {
          position: freezeColumnCount > 2 && "sticky",
          right: freezeColumnCount > 2 && "207px",
          zIndex: freezeColumnCount > 2 && 2,
          backgroundColor: lgUp && freezeColumnCount > 2 && "#fff",
        },
        "&:nth-of-type(4)": {
          position: freezeColumnCount > 3 && "sticky",
          right: freezeColumnCount > 3 && "207px",
          zIndex: freezeColumnCount > 3 && 3,
          backgroundColor: lgUp && freezeColumnCount > 3 && "#fff",
        },
        "&:last-child": {
          position: freezeOperations ? "sticky" : "",
          left: freezeOperations ? "0" : "",
          zIndex: freezeOperations ? 3 : "",
          backgroundColor: freezeOperations ? "#fff" : "",
        },
      },
    },
    cells: {
      style: {
        padding: !lgUp && cellPx,
        zIndex: lgUp && 1,
        "&:nth-of-type(1)": {
          position: freezeColumnCount > 0 && "sticky",
          right: freezeColumnCount > 0 && 0,
          zIndex: freezeColumnCount > 0 && 2,
          backgroundColor: lgUp && freezeColumnCount > 0 && "#fff",
        },
        "&:nth-of-type(2)": {
          position: freezeColumnCount > 1 && "sticky",
          right: freezeColumnCount > 1 && "100px",
          zIndex: freezeColumnCount > 1 && 2,
          backgroundColor: lgUp && freezeColumnCount > 1 && "#fff",
        },
        "&:nth-of-type(3)": {
          position: freezeColumnCount > 2 && "sticky",
          right: freezeColumnCount > 2 && "207px",
          zIndex: freezeColumnCount > 2 && 2,
          backgroundColor: lgUp && freezeColumnCount > 2 && "#fff",
        },
        "&:nth-of-type(4)": {
          position: freezeColumnCount > 3 && "sticky",
          right: freezeColumnCount > 3 && "207px",
          zIndex: freezeColumnCount > 3 && 3,
          backgroundColor: lgUp && freezeColumnCount > 3 && "#fff",
        },
        "&:last-child": {
          position: freezeOperations ? "sticky" : "",
          left: freezeOperations ? "0" : "",
          zIndex: freezeOperations ? 3 : "",
          backgroundColor: freezeOperations && "#fff",
          borderBottom: freezeOperations && "3px solid #FFFBF9",
          borderRight: freezeOperations && "3px solid #FFFBF9",
        },
        "&:nth-of-type(odd)": {},
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
