import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// component
import { CheckBox, Input, UseForm } from "@components/Form";
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { Wizard } from "@components/Wizard";
//Redux
import { goNextPage, handleSetData, setAuthorizeStep, setUnAthorizeStep } from "@slices/Wizard";
import { useDispatch, useSelector } from "react-redux";
import { useFetching, useMutate } from "@services/axiosHelper";
import { RegisterProxy } from "@services/api/Register";
import { useMemo } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const Register = () => {
  const [active, setActive] = useState({ activate: true, message: "" });
  const [agreeRules, setAgreeRules] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  const selector = useSelector((state) => state);
  const activHandler = (e, type) => {
    localStorage.setItem("mobile", e.target.value);
      if (e.target.value.length === 11 || e.target.value.length==0) {
        setActive({ activate: true, message: "" });
      } else {
        setActive({
          activate: false,
          message: "شماره موبایل باید 11 رقم باشد",
        });
      }
  };

  const Register = useMutate("ثبت نام", RegisterProxy.Register, {
    successMessage: "کد ارسال شد",
  });
  const RegsiterStatus = Register.res.status === 1;
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      mobile: e.target.phoneNumber.value,
    };
    if (regex.test(e.target.phoneNumber.value) && active) {
      setActive({ activate: true, message: "" });
      Register.mutate(body);
    } else {
      setActive({
        activate: false,
        message: "لطفا شماره موبایل معتبر وارد نمایید",
      });
    }
  };
  useEffect(() => {
    localStorage.setItem("userId", Register.res.id);
    if (RegsiterStatus) {
      dispatch(setAuthorizeStep(true));
      dispatch(setUnAthorizeStep())
    }
  }, [RegsiterStatus]);

  return (
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
            ثبت‌ نام
          </Typography>
          <Typography theme="themeS" size="h2">
            شماره موبایل خود را وارد کنید
          </Typography>
        </div>
        <div className="column gap-1 relative">
          <Input
            placeholder="شــمـاره مـوبـایـل"
            phone={"phone"}
            icon={`fi fi-rr-smartphone text ${active ? "" : "text-error"}`}
            onBlur={(e) => activHandler(e, "mobile")}
            type="number"
            className={active.activate ? "" : "text-error border border-error"}
            required
            name="phoneNumber"
          />
          {active.activate ? (
            ""
          ) : (
            <Typography
              className="text-error absolute -bottom-5 "
              size="h4"
            >
          {active.message}

            </Typography>
          )}
         
        </div>
        <div className="column  justify-between  gap-1 md:h-auto md:gap-29  pt-6 h-full">
          <div>
            <div>
              <Typography theme="themeS" size="h3">
                قبلا در سایت ثبت ‌نام کرده اید؟{" "}
              </Typography>
            </Link>
          </div>
          <div className="flex items-center">
            <CheckBox
              className="m-[0.25rem] text-disable"
              gap="gap-1"
              title="تایید"
              required
              onChange={(e) => setAgreeRules(e.target.checked)}
            />
            <Link href={"/number"}>
              <Typography theme="themeM" bold size="h3">
                شرایط همراه‌تل
              </Typography>
            </Link>
            <Typography theme="themeS" size="h3" className="px-1">
              و
            </Typography>
            <Link href={"/number"}>
              <Typography theme="themeM" bold size="h3">
                قوانین حریم‌ خصوصی
              </Typography>
              <Link href={"/number"}>
                <Typography theme="themeM" bold size="h3">
                  قوانین حریم‌ خصوصی
                </Typography>
              </Link>
            </div>
          </div>
          <Wizard.WizardNavigation type="submit" label="ثبت نام" varient={active ? "primary" : "disabled"} />
        </div>
        <Wizard.WizardNavigation
          type="submit"
          label="ثبت نام"
          varient={agreeRules ? "primary" : "disabled"}
          isLoading={Register.isLoading}
        />
      </form>
    </div>
  );
};
