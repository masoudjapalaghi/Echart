// Redux
import { useDispatch, useSelector } from "react-redux";
// ApiCall
import useToggle from "@hooks/useToggle";
import { provinceCityProxy } from "@services/api";
import { useFetching } from "@services/axiosHelper";
import { useEffect } from "react";
import { useState } from "react";
// Components
import { InputSelect } from "../InputSelect";
import { setCityField, setProvinceField } from "@slices/Crm/ProvinceCity";

export const ProvinceCitySelect = ({ nameCity, nameProvince,getValueHandler=()=>{},hasCity=true, ...rest }) => {

  const [resetCity, setResetCity] = useState(false);

  const { cityId, provinceId } = useSelector((state) => state.provinceCity);
  const { resetStatus } = useSelector((state) => state.resetSearchFiled);

  const {
    province,
    isLoading: provinceIsloading,
    isFetched,
    refetch: refetchProvince,
  } = useFetching(["province"], () => provinceCityProxy.getListProvince(), {
    enabled: false,
  });
  let provinceOptions =
    province.status === 1 ? province.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId })) : [];

  const {
    city,
    isLoading: CityIsLoading,
    isFetching,
    refetch: cityRefetch,
    remove,
  } = useFetching(["city"], () => provinceCityProxy.getListCity(provinceId), {
    enabled: false,
  });

  let cityOptions =
    city.status === 1 ? city.entity.map((u) => ({ value: u.id, label: u.title, typeId: u.typeId })) : [];

  const dispatch = useDispatch();

  const getProvince = (e) => {
    dispatch(setProvinceField(e.value));
    getValueHandler(e)
    setResetCity(true)
  };
  const getCity = (e) => {
    dispatch(setCityField(e.value));
  };

  useEffect(() => {
    if (resetStatus) {
      dispatch(setProvinceField(null));
      dispatch(setCityField(null));
    }
  }, [resetStatus]);


  useEffect(() => {
    if (isFetched) {
      setResetCity(false)
    }
  }, [resetCity,isFetched]);

  const restartCityDelect = () => {
    remove();
    cityRefetch();
  };
  return (
    <>
      <InputSelect
        options={provinceOptions}
        isLoading={province && provinceIsloading}
        title="استان"
        name={nameProvince}
        onFocus={!province.entity?.length > 0 && refetchProvince}
        handleChange={getProvince}
        {...rest}
      />
      {hasCity? <InputSelect
        options={cityOptions}
        isLoading={isFetching}
        title="شهر"
        name={nameCity}
        onFocus={restartCityDelect}
        handleChange={getCity}
        reset={resetCity}
        disabled={!provinceId}
        {...rest}
      />:null}
     
    </>
  );
};
