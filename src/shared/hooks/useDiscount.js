import { SellsOrderType } from "@constant/DTO";
import { EnumFilterByIdToTypeSale } from "@constant/Enum/Discount";
import { DiscountProxy } from "@services/api/Discount";
import { setModalSale } from "@slices/Discount/ModalSale";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "./useMediaQuery";

export const useDiscount = (
  stateNames = {},
  getAndPostNames = [],
  getByIdName = "",
  nameGoodCount = "",
  prevPrice = false
) => {
  /// states
  const [data, setData] = useState(stateNames);
  const [ProductSelectAsyncDefault, setProductSelectAsyncDefault] = useState([]);
  const [CustomerSelectAsyncDefault, setCustomerSelectAsyncDefault] = useState([]);
  const [loadingGetBuyId, setLoadingGetById] = useState(false);
  const [radioBox, setRadioBox] = useState({
    countStop: false,
    percentStop: false,
  });
  const [res, setRes] = useState({});
  const lgUp = useMediaQuery("lgUp");

  ///Constans
  const sellsOrderType = new SellsOrderType();

  ///query
  const { query } = useRouter();

  ///Functions
  const handleGetDateWithTime = (value, name) => {
    setData({ ...data, [name]: value.toJSON() });
  };

  const handleChangeProductSelect = (str) => {
    setData({ ...data, goodId: str.value });
  };

  const handleChangeCutomerCategory = (str) => {
    setData({ ...data, customerCategoryId: str.value });
  };

  const resetDataInState = () => {
    setData(stateNames);
    setRadioBox({
      countStop: false,
      percentStop: false,
    });
  };

  ///getById
  const getDataById = async () => {
    if (query.saleId) {
      setLoadingGetById(true);
      const res = await DiscountProxy[getByIdName](query?.saleId);
      const entity = res.data.entity;
      setRes(entity);
      if (entity && Object.keys(entity)) {
        const tempObj = {};
        Object.keys(entity).map((key, index) => {
          getAndPostNames.map((getAndPostName) => {
            if (getAndPostName.postName != null && getAndPostName.getName === key) {
              tempObj[getAndPostName.postName] = getAndPostName.type
                ? entity[getAndPostName.getName][getAndPostName.type]
                : entity[getAndPostName.getName];
            }
          });
        });
        setData(tempObj);
        setProductSelectAsyncDefault([entity.good]);
        setCustomerSelectAsyncDefault([entity.customerCategory]);
        setLoadingGetById(false);
        setRadioBox({
          countStop: entity.amountTypeId === 320 ? true : false,
          percentStop: entity.amountTypeId === 321 ? true : false,
        });
      }
    }
  };
  ///setData Before render
  useEffect(() => {
    if (EnumFilterByIdToTypeSale(+query.filterBy) === sellsOrderType.Product) {
      setData({ ...data, goodId: +query.SearchId });
    } else if (EnumFilterByIdToTypeSale(+query.filterBy) === sellsOrderType.CustomerGroup) {
      setData({ ...data, customerCategoryId: +query.SearchId });
    }
  }, [query]);

  useEffect(() => {
    if (query.saleId) {
      getDataById();
    }
  }, [query.saleId]);

  const countGoods = useSelector((state) => state.countGoods.value);
  const handleChangeGoods = (arr) => {
    const tempObj = {};
    arr.map((item, index) => {
      countGoods?.map((value, char) => {
        if (item.value == value.value) {
          tempObj[String(value.value)] = value.count;
        }
      });
    });
    setData({ ...data, [nameGoodCount]: tempObj });
  };
  return {
    data,
    setData,
    ProductSelectAsyncDefault,
    setProductSelectAsyncDefault,
    CustomerSelectAsyncDefault,
    setCustomerSelectAsyncDefault,
    loadingGetBuyId,
    setLoadingGetById,
    radioBox,
    setRadioBox,
    handleGetDateWithTime,
    handleChangeProductSelect,
    handleChangeCutomerCategory,
    handleChangeGoods,
    resetDataInState,
    lgUp,
    query,
    sellsOrderType,
    res,
  };
};

export const useModalSale = (saleName) => {
  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modalSale[saleName]);
  const openModal = () => {
    dispatch(setModalSale({ type: saleName, state: true }));
  };
  const closeModal = () => {
    dispatch(setModalSale({ type: saleName, state: false }));
  };
  return {
    modalStatus,
    openModal,
    closeModal,
  };
};
