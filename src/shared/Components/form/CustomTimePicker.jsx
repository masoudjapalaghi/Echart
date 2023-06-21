import { useState } from "react";
//slik
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

//component
import { Button } from "@components/Button";
import { e2p, fixNumbers, toForeignLanguage } from "src/utils";
// import span from "@components/span";
// import { SearchIconGp } from "@components/icon";

export const SetAannouhcemertTimePopUp = ({ setMinutes, setHour }) => {
  const DownArrow = (props) => {
    const { onClick } = props;
    return (
      <i
        className="fi fi-rr-angle-down cursor-pointer mt-4"
        onClick={onClick}
      ></i>
    );
  };
  const UpArrow = (props) => {
    const { onClick } = props;
    return (
      <i
        className="fi fi-rr-angle-up cursor-pointer mb-4"
        onClick={onClick}
      ></i>
    );
  };
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinutes, setSelectedMinutes] = useState(1);
  const settingsHour = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    nextArrow: <DownArrow />,
    prevArrow: <UpArrow />,
    beforeChange: function (currentSlide, nextSlide) {
      let centerHour = nextSlide;
      if (centerHour === 25) {
        setSelectedHour(1);
      } else {
        setSelectedHour(nextSlide);
      }
    },
    afterChange: function (currentSlide) {
      console.log("currentSlide",currentSlide)
     
        setHour(currentSlide);
    },
  };
  const settingsSecound = {
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    nextArrow: <DownArrow />,
    prevArrow: <UpArrow />,
    beforeChange: function (currentSlide, nextSlide) {
      let centerSecound = nextSlide;
      if (centerSecound === 61) {
        setSelectedMinutes(1);
      } else {
        setSelectedMinutes(nextSlide);
      }
    },
    afterChange: function (currentSlide) {
      const minutes = minutesEnum(currentSlide);

      console.log(minutes)
      setMinutes(minutes);
    },
  };
  const onControlledDrag = (e, position) => {};
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={submitHandler}
      className="column p-4 gap-6 justify-center items-center"
    >
      <div className="column items-center w-full drop-shadow-base rounded p-2 ">
        <div className="column justify-center items-center ">
          <div className="flex center gap-4 flex-row-reverse items-center justify-center ">
            <div className="flex flex-col gap-2">
              <Slider
                {...settingsSecound}
                className="w-8 rounded border border-active"
              >
                {minutes.map((item, index) => {
                  return (
                    <div key={index} className="w-full relative ml-1 px-[2px]">
                      <span
                        persianNumber
                        className={
                          "text-black rounded absolute -top-[17px] -left-[2px] p-[2px]  text-center"
                        }
                        theme="themeS"
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <span className="pl-2">:</span>
            <div className="flex flex-col gap-2">
              <Slider
                {...settingsHour}
                className="w-8 border border-active rounded"
              >
                {hours.map((item, index) => {
                  return (
                    <div key={index} className="w-full relative ml-1 px-[2px]">
                      <span
                        persianNumber
                        className={
                          "text-black rounded absolute -top-[17px] -left-[2px] p-[2px] text-center "
                        }
                        theme="themeS"
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>

        <div className="column gap-3  justify-center items-center  pt-6 ">
          <p className="text-xs text-black">لطفا زمان را انتخاب کنید</p>
        </div>
      </div>
      {/* {adedTime.length > 0 ? (
        <>
          {adedTime.map((item, index) => {
            return (
              <>
                <div className="flex gap-1">
                  <span
                    theme="themeS"
                    size="h4"
                    className=" flex items-center justify-center w-10 h-10 drop-shadow-base rounded bg-white"
                  >
                    {index + 1}
                  </span>
                  <div className="flex w-full h-10 drop-shadow-base rounded bg-white justify-between  items-center p-1">
                    <span size="h3" theme="themeS">
                      اعلام قیمت در
                    </span>
                    <div>
                      <span size="h3">{item.minutesValue}</span>
                      <span size="h3">:</span>
                      <span size="h3">{item.hourValue}</span>
                      <span size="h3">
                        {item.hourValue > 12 ? "بعد از ظهر" : "قبل از ظهر"}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      ) : null} */}
    </form>
  );
};
const minutes = ["00", "15", "30", "45"];
const hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

const minutesEnum = (value) => {
  return {
    0: "0",
    1: 15,
    2: 30,
    3: 45,
  }[value];
};
