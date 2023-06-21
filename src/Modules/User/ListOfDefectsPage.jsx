import React from "react";
import { useRouter } from "next/router";
import useToggle from "@hooks/useToggle";
// componenet
import { Button } from "@components/Button";
import Typography from "@components/Typography";
import { Logo } from "@components/Logo";

const ListOfDefectsPage = ({ status = "withDefects" }) => {
  const [seeDefects, setSeeDefects] = useToggle(false);
  const router=useRouter()
  const goToProfileHandler = () => {
    router.push("http://localhost:2020/register/completeProfile")
  };
  const renderComponent = (status) => {
    switch (status) {
      case "inProgress":
        return (
          <div className="center column w-full bg-[url('/Images/Test/ListOfDefects.png')] bg-center bg-no-repeat bg-[length:200px_200px]">
            <Logo />
            <div className="column gap-4 center h-[48vh]">
              <Typography bold theme="themeP" size="h3">
                کاربر گرامی
              </Typography>
              <Typography bold theme="themeP" size="h3">
                پروفایل شما در حال بررسی است
              </Typography>
            </div>
          </div>
        );
        break;
      case "withDefects":
        if (seeDefects) {
          return (
            <div className="column gap-6 items-start w-full  h-[98vh] justify-between ">
              <Logo onClick={setSeeDefects}/>
              <div className="column gap-2">
                <Typography bold theme="themeP" size="lg">
                  لیست نواقص اطلاعات پروفایل
                </Typography>
                <Typography bold theme="themeS" size="h3">
                  نواقص موجود در اطلاعات پروفایل خود را اصلاح کنید
                </Typography>
                <Typography size="h3" className="text-error flex gap-2 mt-5">
                  <i className="i-error"></i>
                  طول رمز عبور باید بیشتر از 8 کاراکتر باشد
                </Typography>
                <Typography size="h3" className="text-error flex gap-2">
                  <i className="i-error"></i>
                  طول رمز عبور باید بیشتر از 8 کاراکتر باشد
                </Typography>
                <Typography size="h3" className="text-error flex gap-2">
                  <i className="i-error"></i>
                  طول رمز عبور باید بیشتر از 8 کاراکتر باشد
                </Typography>
              </div>
              <div className="column gap-2"></div>
              <Button onClick={goToProfileHandler}>تکمیل کردن پروفایل</Button>
            </div>
          );
        } else {
          return (
            <div className="column gap-20 w-full h-[98vh] justify-between bg-[url('/Images/Test/ListOfDefects.png')] bg-center bg-no-repeat bg-[length:200px_200px]">
              <Logo />
              <div className="column gap-2 center flex-1">
                <Typography bold theme="themeP" size="h3">
                  کاربر گرامی
                </Typography>
                <Typography bold theme="themeP" size="h3">
                  اطلاعات پروفایل شما دارای نقص است
                </Typography>
                <Typography bold theme="themeP" size="h3">
                  لطفا نسبت به اصلاح آن اقدام کنید
                </Typography>
                <Typography onClick={setSeeDefects} theme="themeM" size="3" bold className="cursor-pointer underline">
                  مشاهده نواقص
                </Typography>
              </div>
              <Button  onClick={goToProfileHandler}>تکمیل کردن پروفایل</Button>
            </div>
          );
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="h-[95vh] md:h-[523px] w-full md:w-90 md:border md:border-whiteSecondary rounded-2xl p-8 column justify-between items-center">
      {renderComponent(status)}
    </div>
  );
};

export default ListOfDefectsPage;
