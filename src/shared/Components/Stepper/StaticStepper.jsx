import Typography from "@components/Typography";
import { useEffect, useMemo, useState } from "react";

const StaticStepper = ({ activeStep = 0 }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(activeStep);
  }, [activeStep]);
  return (
    <div className="w-full py-6">
      <div className="flex">
        {steps.map((item, index) => (
          <div className="w-1/4 text-center" key={item.id}>
            <div className="relative mb-2">
              {index !== 0 ? (
                <div className="w-[calc(95%_-_25px)]  absolute flex align-center items-center align-middle content-center top-1/2 translate-x-2/4 -translate-y-2/4 ">
                  <div className="w-full -z-[1] bg-whiteSecondary rounded items-center align-middle align-center flex-1">
                    <div className="w-0 h-[.5px] secondaryTheme  rounded" style={activeStep + 1 > index ? { width: "100%" } : activeStep + 1 === index ? { width: "50%" } : { width: "0%" }} />
                  </div>
                </div>
              ) : null}

              <div
                className={`w-8 h-8 mx-auto rounded-full text-lg  flex items-center ${
                  activeStep >= index ? "secondaryTheme text-white" : "bg-whitePrimary border  border-whiteSecondary text-whiteSecondary"
                }`}
              >
                <span className="text-center  w-full">
                  <i className={item.icon} />
                </span>
              </div>
            </div>
            <Typography theme={activeStep >= index ? "themeM" : "themeS"} size="h4" className="hidden md:inline">
              {item.label}
            </Typography>
          </div>
        ))}
      </div>
      {steps.map((item, index) => {
        if (activeStep === index) {
          return (
            <Typography key={index} theme={activeStep >= index ? "themeM" : "themeS"} size="h4" className="block md:hidden text-center">
              {activeStep === index ? item.label : null}
            </Typography>
          );
        }
      })}
    </div>
  );
};

export default StaticStepper;
const steps = [
  {
    id: 0,
    icon: "i-factory",
    label: "در حال آماده سازی",
  },
  {
    id: 1,
    icon: "fi fi-rr-gift",
    label: "آماده تحویل به پیک",
  },
  {
    id: 2,
    icon: "i-delivery",
    label: "تحویل پیک شده",
  },
  {
    id: 3,
    icon: "i-rout",
    label: "پیک در مسیر",
  },
  {
    id: 4,
    icon: "i-delivery-one",
    label: "تحویل بسته",
  },
];
