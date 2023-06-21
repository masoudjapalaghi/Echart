import React, { useState, useRef, useEffect } from "react";


export const Timer = ({ timeDone, start, done, ToggleStart, setDone }) => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState(timeDone);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      setDone();
    }
  };

  const clearTimer = (e) => {
    setTimer("00:00:00");

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + timeDone);
    return deadline;
  };

  const onClickStart = () => {
    clearTimer(getDeadTime());
    ToggleStart();
  };

  return (
    <div className="timer">
      {start ? (
        done ? (
          <span className=" badge_label badge bg-warning text-dark font-weight-bolder ">پایان زمان</span>
        ) : (
          <span className=" badge_label badge bg-primary font-weight-bolder ">{timer}</span>
        )
      ) : (
        <button className="btn btn-success" onClick={onClickStart}>
          شروع آزمون
        </button>
      )}
    </div>
  );
};
