// Redux
import { useDispatch } from "react-redux";

// Components
import { InputSelect } from "../InputSelect";
import { setProvinceField } from "@slices/Crm/ProvinceCity";

export const ProvinceHardCodeByLatAndLong = ({ getValueHandler, ...rest }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setProvinceField(e.value));
    getValueHandler(e);
  };

  return (
    <>
      <InputSelect title="استان" handleChange={handleChange} {...rest} />
    </>
  );
};
