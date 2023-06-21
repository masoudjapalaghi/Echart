import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// hooks

import useToggle from "@hooks/useToggle";
// compponent
import { Button } from "@components/Button";
import { Input } from "@components/Form";
import { Logo } from "@components/Logo";
import Typography from "@components/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutate } from "@services/axiosHelper";
import { RegisterProxy } from "@services/api/Register";
import { setCookie } from "cookies-next";

const SignInPage = () => {
  const [showPass, setShowPass] = useToggle();
  const [active, setActive] = useState();
  const [info, setInfo] = useState({ mobile: "", pass: "" });
  const { push } = useRouter();
  const onClickIconleft = () => {
    setShowPass();
  };

const {mutate,res} = useMutate("ورود", RegisterProxy.signIn);
let token = res.entity && res.entity.token;
  const activHandler = (e, type) => {
    if (type === "mobile") {
      setInfo((prev) => ({ ...prev, mobile: e.target.value }));
    } else {
      setInfo((prev) => ({ ...prev, pass: e.target.value }));
    }
    if (info.mobile.length > 0 && info.mobile.length > 9) {
      setActive(true);
    }
    if (info.mobile.length > 0 && info.pass.length > 3) {
      setActive(true);
    }
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      [DTO.userName]: e.target[DTO.userName].value,
      [DTO.password]: e.target[DTO.password].value,
    };
    mutate(body);

  };

  useMemo(() => {
    if (token) {
      setCookie("token", token);
      push("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={submitHandler}
      className="w-full md:w-90 column md:border rounded-2xl pt-[2.188rem] md:px-8 gap-6 md:h-[29.875rem]"
    >
      <div className="flex w-full ">
        <Logo />
      </div>
      <div className="column gap-1">
        <Typography bold size="lg">
          ورود
        </Typography>
        <Typography theme="themeS" size="h2">
          لطفا شماره موبایل و رمز عبور خود را وارد کنید
        </Typography>
      </div>
      <div className="column gap-4">
        <Input
          type="number"
          name={[DTO.userName]}
          placeholder="شــمـاره مـوبـایـل"
          icon="fi fi-rr-smartphone"
          onChange={(e) => activHandler(e, "mobile")}
          required
        />
        <Input
          type={"password"}
          placeholder="رمــز عـبـور"
          name={[DTO.password]}
          icon="fi fi-rr-key"
          iconLeft="fi fi-rr-eye"
          onClickIconleft={onClickIconleft}
          onChange={(e) => activHandler(e, "pass")}
          required
        />
      </div>
      <div className="column gap-1">
        <div>
          <Typography theme="themeS" size="h3">
            حساب کاربری ندارید؟
          </Typography>
        </div>

        <form className="column justify-between h-full md:h-auto md:gap-[55px]" onSubmit={submitHandler}>
          <div className="column gap-6">
            <div className="column gap-2">
              <Input
                type="number"
                name="mobile"
                placeholder="شــمـاره مـوبـایـل"
                icon="fi fi-rr-smartphone"
                onChange={(e) => activHandler(e, "mobile")}
                required
              />
              <Input
                type={showPass ? "number" : "password"}
                placeholder="رمــز عـبـور"
                name="pass"
                icon="fi fi-rr-key"
                iconLeft="fi fi-rr-eye"
                onClickIconleft={onClickIconleft}
                onChange={(e) => activHandler(e, "pass")}
                required
              />
            </div>
            <div className="column gap-1">
              <div>
                <Typography theme="themeS" size="h3">
                  حساب کاربری ندارید؟
                </Typography>
                <Link href={"/register"}>
                  <Typography theme="themeM" size="h3" bold>
                    ثبت نام
                  </Typography>
                </Link>
              </div>
              <Link href={"/login/forgetPassword"}>
                <Typography theme="themeM" bold size="h3">
                  رمز عبور خود را فراموش کرده اید؟
                </Typography>
              </Link>
            </div>
          </div>
          <Button type="submit" width="w-18 w-full" varient={active ? "primary" : "disabled"}>
            ورود
          </Button>
        </form>
      </div>
      <Button
        type="submit"
        width="w-18 w-full"
        varient={active ? "primary" : "disabled"}
      >
        ورود
      </Button>
    </form>
  );
};

export default SignInPage;

const DTO = {
  userName: "userName",
  password: "password",
};
