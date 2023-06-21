// component
import { Wizard } from "@components/Wizard";
import NewPasswordPage from "../NewPasswordPage";
import { ConfirmCode } from "./ConfirmCode";
import PersobalInformation from "./PersonalInformation";
import { Register } from "./Register";
import useRouteChanged from "@hooks/useRouteChanged";
import { useEffect } from "react";

const SignUpPage = () => {
  useEffect(() => {
 
  }, [])
  
  return (
    <div>
      <Wizard>
        <Wizard.WizardPages>
          <Register />
          <ConfirmCode />
          <PersobalInformation/>
          <NewPasswordPage/>
        </Wizard.WizardPages>
      </Wizard>
    </div>
  );
};

export default SignUpPage;
