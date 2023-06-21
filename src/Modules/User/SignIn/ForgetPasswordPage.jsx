import { Input } from "@components/Form";
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { Wizard } from "@components/Wizard";
import { RegisterProxy } from "@services/api/Register";
import { useMutate } from "@services/axiosHelper";
//Redux
import { setAuthorizeStep } from "@slices/Wizard";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = () => {
  const data =useSelector(state => state.wizard.data)
  const [active, setActive] = useState({ activate: true, message: "" });
  const [info, setInfo] = useState({ mobile: "" });
  const { push } = useRouter();
  const dispatch = useDispatch();


  const ForgetPass=useMutate("فراموشی رمز عبور",RegisterProxy.forgetPass)
  const forgetPassStatus=ForgetPass.res.status === 1
  const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  const activHandler = (e, type) => {
    setTimeout(() => {
        setInfo((prev) => ({ ...prev, mobile: e.target.value }));
    }, 0);
    setTimeout(() => {
      if (e.target.value.length > 10) {
        setActive({activate:true,message:"شماره موبایل باید باید 10 رقم باشد"});
      }else{
        setActive({activate:false,message:""});
      }
    }, 500);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const body={
      [DTO.mobile]:e.target[DTO.mobile].value
    }
    
    if (regex.test(e.target[DTO.mobile].value) && active.activate) {
      setActive({ activate: true, message: "" });
      ForgetPass.mutate(body)
    } else {
      setActive({
        activate: false,
        message: "لطفا شماره موبایل معتبر وارد نمایید",
      });
    }
  };
  if(forgetPassStatus) {
    localStorage.setItem("userId", ForgetPass.res.id);
     dispatch(setAuthorizeStep(true))
    }
  return (
    <>
       <div>
      <form
        onSubmit={submitHandler}
        className=" w-full md:w-90 column md:border rounded-2xl pt-9 md:px-8 gap-6 md:h-[478px] text-disable"
      >
        <div className="flex w-full">
          <Logo />
        </div>
        <div className="column gap-1">
          <Typography bold size="lg">
           فراموشی رمز عبور
          </Typography>
          <Typography theme="themeS" size="h2">
            شماره موبایل خود را وارد کنید
          </Typography>
        </div>
        <div className="column gap-1">
          <Input
            placeholder="شــمـاره مـوبـایـل"
            name={DTO.mobile}
            icon={`fi fi-rr-smartphone text ${active ? "" : "text-error"}`}
            onBlur={(e) => activHandler(e, "mobile")}
            type="number"
            className={active ? "" : "text-error border border-error"}
            required
          />
          {active.activate ? (
            ""
          ) : (
            <Typography className="text-error " size="h4">
              {active.message}
            </Typography>
          )}
        </div>
        <div className="column gap-1  md:h-[16vh]">                                                                 
        </div>
        <Wizard.WizardNavigation type="submit" label="ارسال کد تایید" varient={active ? "primary" : "disabled"}/>
      </form>
    </div>
  
  </>
  )
}

export default ForgetPassword

const DTO={
  mobile:"mobile"
}