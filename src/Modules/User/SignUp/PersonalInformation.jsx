import { useSelector } from "react-redux";
// component
import { Input, UseForm } from "@components/Form";
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { Wizard } from "@components/Wizard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthorizeStep, setUnAthorizeStep } from "@slices/Wizard";
import { RegisterProxy } from "@services/api/Register";
import { useMutate } from "@services/axiosHelper";
const PersonalInformation = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const RegisterName = useMutate(
    "نام و نام خانوادگی",
    RegisterProxy.nameAndFamily
    );
  const RegisterStatus = RegisterName.res.status === 1;
  const userId = localStorage.getItem("userId");
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      [DTO.userId]: userId,
      [DTO.firstName]: e.target[DTO.firstName].value,
      [DTO.lastName]: e.target[DTO.lastName].value,
    };
    localStorage.setItem("user",{name:e.target[DTO.lastName].value,family:e.target[DTO.firstName].value})
    RegisterName.mutate(body);
  };
  useEffect(() => {
    
    if (RegisterName.res.id !== 0 && RegisterStatus) {
      dispatch(setAuthorizeStep(true))
      dispatch(setUnAthorizeStep())
    }
  }, [RegisterStatus]);

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" w-full md:w-90 column md:border rounded-2xl pt-9 md:px-8 gap-6 md:h-[478px] text-disable"
      >
        <div className="flex w-full ">
          <Logo />
        </div>
        <div className="column gap-1">
          <Typography bold size="lg">
            ثبت‌ نام
          </Typography>
          <Typography theme="themeS" size="h2">
            نام و نام خانوادگی خود را وارد کنید{" "}
          </Typography>
        </div>
        <div className="column gap-4">
          <Input
            placeholder="نام "
            icon="fi fi-rr-user"
            type="text"
            required
            name={[DTO.firstName]}
          />
          <Input
            placeholder="نام نام خانوادگی "
            FamilyName={"family"}
            icon="fi fi-rr-user"
            type="text"
            required
            name={[DTO.lastName]}
          />
        </div>
        <div className="column gap-2  md:h-[10vh]"></div>
        <Wizard.WizardNavigation label="ثبت نام" type="submit" isLoading={RegisterName.isLoading}/>
      </form>
    </div>
  );
};

export default PersonalInformation;

const DTO = {
  userId: "userId",
  firstName: "firstName",
  lastName: "lastName",
};
