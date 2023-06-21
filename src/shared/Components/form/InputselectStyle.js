export const customStyles = (md, disabled, outline) => {
  return {
    container: (provided, state) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided, state) => ({
      ...provided,
      border: "unset",
      boxShadow: "unset",
      fontSize: "10px",
      fontFamily: "IranYekan",
      minHeight: "40px !important",
      minWidth: md ? "100%" : "",
      backgroundColor: disabled || outline ? disabled && outline ? "#f5f5f5"  : "transparent " : "white",
      border: disabled || outline ? "1px solid #e0e0e0 " : "unset",
      fontSize:"12px"
    }),

    menu: (provided, state) => ({
      ...provided,
      border: "unset!important",
      boxShadow:"0px 6px 12px rgba(0, 0, 0, 0.15)",
      zIndex: 10,
      fontSize: "10px",
      fontFamily: "IranYekan",
    }),
    menuPortal: (provided, state) => ({
      ...provided,
    }),
    menuList: (provided, state) => ({
      ...provided,
      maxHeight: "175px!important",
    }),

    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #f478201c",
      color: state.isSelected ? "#fff" : "",
      fontWeight: "bold",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      marginLeft: "60px",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      // padding: "6px",
      backgroundColor: "#F5F5F5",
      alignItems: "center",
      borderRaduis: "25px",
    }),
    clearIndicator :(provided, state) => ({
      display: "none!important"
    }), 
    multiValueRemove: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff",
      maxHeight: "16px",
      padding: "10px 3px",
      marginLeft: "2px",
      
      svg: {
        width: "9px",
        height: "9px",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      whiteSpace: "nowrap",
      fonstSize:"10px!important"
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  };
};
