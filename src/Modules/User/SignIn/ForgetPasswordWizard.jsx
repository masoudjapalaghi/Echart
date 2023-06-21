import { Wizard } from "@components/Wizard";
import { ForgetPasswordPage, NewPasswordPage } from "..";
import { ConfirmCode } from "../SignUp/ConfirmCode";


// Modules



function ForgetPasswordWizard() {
  return (
    <div className=" w-full flex flex-col gap-12 max-w-[408px] lg:h-auto ">

    <Wizard>
      <Wizard.WizardPages>
        <ForgetPasswordPage/>
        <ConfirmCode/>
        <NewPasswordPage/>
      </Wizard.WizardPages>
    </Wizard>
  </div>
  )
}

export default ForgetPasswordWizard