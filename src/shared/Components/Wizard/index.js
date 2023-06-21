import dynamic from "next/dynamic";

export const Wizard = dynamic(() => import("./wizard"), {
  ssr: false,
});
export { useMangeDate, useWizardButtons, useWizardContext, useWizardPages, useWizardProgress } from "./wizard";
import WizardHeader from "./WizardHeader";
import WizardPages from "./WizardPage";
import WizardNavigation from "./WizardNavigation";
import { WizardButtonNext, WizardButtonPrev } from "./Next&Prev";

Wizard.WizardHeader = WizardHeader;
Wizard.WizardPages = WizardPages;
Wizard.WizardNavigation = WizardNavigation;
Wizard.WizardButtonNext = WizardButtonNext;
Wizard.WizardButtonPrev = WizardButtonPrev;
