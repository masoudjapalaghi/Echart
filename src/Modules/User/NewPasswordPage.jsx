import { useEffect, useState } from "react";

import { useRouter } from "next/router";
// component
import { Input } from "@components/Form";
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { Wizard } from "@components/Wizard";
import { useMutate } from "@services/axiosHelper";
import { RegisterProxy } from "@services/api/Register";
import { useDispatch } from "react-redux";
import { setActivePageIndex, setAuthorizeStep, setUnAthorizeStep } from "@slices/Wizard";

const NewPasswordPage = () => {
  const [active, setActive] = useState("zero");
  const [showPass, setShowPass] = useState({ pass: false, confirm: false });
  const [info, setInfo] = useState({ password: "", confirmPass: "" });
  const dispatch=useDispatch()
  const [isSame, setIsSame] = useState();
  const { push } = useRouter();

  const NewPass = useMutate("پسورد جدید", RegisterProxy.setPassword);
  const NewPassStatus = NewPass.res.status === 1;
  const onClickIconleft = (type) => {
    setShowPass((prev) => {
      if (type === "pass") {
        return { pass: !prev.pass, confirm: prev.confirm };
      } else {
        return { pass: prev.pass, confirm: !prev.confirm };
      }
    });
  };

  const activHandler = (e, type) => {
    if (type === "password") {
      setInfo((prev) => ({
        ...prev,
        password: e.target.value,
        confirmPass: prev.confirmPass,
      }));
    }
    if (type === "confirm") {
      setInfo((prev) => ({
        ...prev,
        password: prev.password,
        confirmPass: e.target.value,
      }));
    }

    setTimeout(() => {
      if (e.target.value.length >= 8) {
        setActive("true");
      } else if (e.target.value.length === 0) {
        setActive("zero");
      } else if (e.target.value.length < 8) {
        setActive("false");
      }
    }, 200);
  };
  const userId = localStorage.getItem("userId");
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      [DTO.userId]: userId,
      [DTO.password]: e.target[DTO.password].value,
      [DTO.rePassword]: e.target[DTO.rePassword].value,
    };

    if (info.password == info.confirmPass) {
      setIsSame(true);
      NewPass.mutate(body);
    }
    e.target.reset();
  };
  useEffect(() => {
    if (NewPassStatus && NewPass.res.id) {
      dispatch(setAuthorizeStep(true))
      dispatch(setUnAthorizeStep())
      dispatch(setActivePageIndex(0))
      push("/login")
    }
  }, [NewPassStatus]);

  return (
    <div>
      <form
        onSubmit={submitHandler}
        className=" w-full md:w-90 column md:border rounded-2xl pt-9 md:px-8 gap-4 md:h-[29.875rem]  text-disable"
      >
        <div className="flex w-full ">
          <Logo />
        </div>
        <div className="column gap-2">
          <Typography bold size="lg">
            انتخاب رمـز عـبـور{" "}
          </Typography>
          <Typography theme="themeS" size="h2">
            لطفا رمز عبور خود را انتخاب کنید{" "}
          </Typography>
        </div>
        <div className="column gap-4">
          <Input
            type={showPass.pass ? "number" : "password"}
            placeholder="رمــز عـبـور"
            icon="fi fi-rr-key"
            iconLeft="fi fi-rr-eye"
            onClickIconleft={() => onClickIconleft("pass")}
            // pattern={"^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"}
            onChange={(e) => activHandler(e, "password")}
            required
            name={[DTO.password]}
          />
          <Input
            type={showPass.confirm ? "number" : "password"}
            placeholder="تکرار رمز عبور"
            icon="fi fi-rr-key"
            iconLeft="fi fi-rr-eye"
            onClickIconleft={() => onClickIconleft("confirm")}
            // pattern={"^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"}
            onChange={(e) => activHandler(e, "confirm")}
            required
            name={[DTO.rePassword]}
          />
        </div>
        <div className="column gap-2  md:h-[13vh]">
          <Typography
            theme="themeS"
            size="h3"
            className={
              active === "true"
                ? "fi fi-rr-check text-success px-1 flex gap-1 items-center justify-start"
                : "" || active === "false"
                ? "fi fi-sr-cross  text-error px-1 flex gap-1 items-center justify-start"
                : "" || active == "zero"
                ? ""
                : ""
            }
          >
            رمز عبور حداقل باید 8 کاراکتر باشد
          </Typography>
          <Typography
            theme="themeS"
            size="h3"
            className={
              active === "true"
                ? "fi fi-rr-check text-success px-1 flex gap-1 items-center justify-start"
                : "" || active === "false"
                ? "fi fi-sr-cross  text-error px-1 flex gap-1 items-center justify-start"
                : "" || active == "zero"
                ? ""
                : ""
            }
          >
            رمز عبور حداقل باید شامل یک عدد، یک حرف انگلیسی و یک کاراکتر خاص
            (!@$#%^&*) باشد
          </Typography>
          <Typography
            theme="themeS"
            size="h3"
            className={
              active === "true"
                ? "fi fi-rr-check text-success px-1 flex gap-1 items-center justify-start"
                : "" || active === "false"
                ? "fi fi-sr-cross  text-error px-1 flex gap-1 items-center justify-start"
                : "" || active == "zero"
                ? ""
                : ""
            }
          >
            رمز عبور باید با تکرار آن برابر باشد
          </Typography>
        </div>
        <Wizard.WizardNavigation type="submit" label="ثبت" isLoading={NewPass.isLoading}/>
      </form>
    </div>
  );
};

export default NewPasswordPage;

const DTO = {
  userId: "userId",
  password: "password",
  rePassword: "rePassword",
};
