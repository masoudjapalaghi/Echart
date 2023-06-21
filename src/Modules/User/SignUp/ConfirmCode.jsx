import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { goPrevPage, reset, setAuthorizeStep, setUnAthorizeStep } from "@slices/Wizard";
// component
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { Wizard } from "@components/Wizard";
import { InputCode } from "@components/Form";
import UseTimer from "@components/Timer/Timer";
import { Button } from "@components/Button";
import { info } from "autoprefixer";
import { toast } from "react-toastify";
import { goNextPage } from "@slices/Wizard";
import { useMutate } from "@services/axiosHelper";
import { RegisterProxy } from "@services/api/Register";
import Timer from "@components/Timer/Timer";
import { Dot } from "recharts";

export const ConfirmCode = () => {
  const [loading, setLoading] = useState(false);
  // const [Timer, isDone, resendOTP] = UseTimer();
  const [wrong, setWrong] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const mobile = localStorage.getItem("mobile");
  const Otp = useMutate("تایید کد", RegisterProxy.Otp);
  const OtpStatus = Otp.res.status === 1;
  const Register = useMutate("ثبت نام", RegisterProxy.Register, {
    successMessage: "کد ارسال شد",
  });
  const handlerActive = (e) => {
    const otpToNumber = e[0] + e[1] + e[2] + e[3] + e[4];
    body = {
      [DTO.userId]: +userId,
      [DTO.otp]: +otpToNumber,
    };
   Otp.mutate(body);
   
    //  else if (JSON.stringify(value) !== JSON.stringify(a)) {
    // }
  };
  // toast.error("  رمز عبور خود را اشتباه وارد کرده اید", {
  //   toastId: "1",
  // });
  // setTimeout(() => {
  //   setWrong(true);
  // }, 0);
  // useEffect(() => {
  //   if (OtpStatus) {
  //     dispatch(setAuthorizeStep(true));
  //     dispatch(goNextPage());
  //   }
  // }, [isAutorize])

  const resendOTP = () => {
    const body = {
      mobile: mobile,
    };
    setIsDone(false);
    Register.mutate(body);
  };


  useEffect(() => {
    if (Otp.res.id !== 0 && OtpStatus) {
      dispatch(setAuthorizeStep(true));
      dispatch(setUnAthorizeStep())
    }
  }, [OtpStatus])


  return (
    <div className="w-full md:w-90 column md:border rounded-2xl pt-9  md:px-8 gap-6 md:h-[490px]">
      <Logo />
      <form className="flex flex-col gap-[145px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 ">
              <div className="flex justify-between items-center w-full">
                <Typography size="xl" bold>
                  کد تایید
                </Typography>
                <Typography
                  className="cursor-pointer"
                  theme="themeM"
                  onClick={() => dispatch(goPrevPage())}
                >
                  تغییر شماره
                </Typography>
              </div>
              <Typography theme="themeS">{`لطفا کد ارسالی به شماره ${mobile} را وارد کنید`}</Typography>
            </div>
            <div className="w-full flex items-center justify-center ">
              <div className="flex gap-4">
                <InputCode
                  className={
                    wrong ? "text-error border-error focus:outline-none" : " "
                  }
                  handlerCallBack={handlerActive}
                  length={5}
                  loading={loading}
                  onComplete={(code) => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 10000);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Typography
              component="i"
              className="fi fi-rr-phone-pause"
              size=""
              theme="themeP"
            />
            <Typography>تماس با پشتیبانی</Typography>
            <Typography
              component="i"
              className="fi fi-rr-angle-small-left"
              size=""
              theme="themeP"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {isDone ? (
            <Button type="button" onClick={resendOTP}>
              {" "}
              ارسال مجدد کد تایید
            </Button>
          ) : (
            <Wizard.WizardNavigation isLoading={Register.isLoading}>
              <Timer
                restart={OtpStatus}
                isReset={!isDone}
                setIsDone={setIsDone}
                isDone={isDone}
              />
            </Wizard.WizardNavigation>
          )}
        </div>
      </form>
    </div>
  );
};

const DTO = {
  userId: "userId",
  otp: "otp",
};
