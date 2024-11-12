import { useEffect, useState } from "react";
import "./Watch.css";

const Watch = () => {
  const [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });

  const [isRunning, setIsRunning] = useState(false);

  const clickHandler = (e, field) => {
    console.log("e", e.target.value);
    let val = parseInt(e.target.value) || 0;
    if (isNaN(val)) {
      return;
    }

    setTime((prev) => {
      let temp = { ...prev };
      temp[field] = val;
      temp.min += Math.floor(temp.sec / 60);
      temp.sec = temp.sec % 60;

      temp.hour += Math.floor(temp.min / 60);
      temp.min = temp.min % 60;

      return temp;
    });
  };

  const startTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime({ hour: 0, min: 0, sec: 0 });
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          let { hour, min, sec } = prev;
          if (hour === 0 && min === 0 && sec === 0) {
            setIsRunning(false);
            clearInterval(interval);
            return { hour, min, sec };
          }

          if (sec === 0) {
            if (min === 0) {
              hour--;
              min = 59;
              sec = 59;
            } else {
              min--;
              sec = 59;
            }
          } else {
            sec--;
          }

          return { hour, min, sec };
        });
      }, [1000]);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="HH"
          value={time.hour.toString()}
          onChange={(e) => clickHandler(e, "hour")}
        />
        <input
          type="text"
          placeholder="MM"
          value={time.min.toString()}
          onChange={(e) => clickHandler(e, "min")}
        />
        <input
          type="text"
          placeholder="SS"
          value={time.sec.toString()}
          onChange={(e) => clickHandler(e, "sec")}
        />
      </div>
      <div className="btn-actions">
        <button onClick={startTimer}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
};

export default Watch;
