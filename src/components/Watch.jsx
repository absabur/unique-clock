"use client";

import React, { useEffect, useState } from "react";
import "./Watch.css"; // Import the CSS file

const Watch = () => {
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
    ampm: "",
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const ampm = hour >= 12 ? "PM" : "AM";

      // Convert 24-hour format to 12-hour format
      const formattedHour = hour % 12 || 12;

      setTime({
        hour: formattedHour.toString().padStart(2, "0"),
        minute: minute.toString().padStart(2, "0"),
        second: second.toString().padStart(2, "0"),
        ampm,
      });
    };

    // Update the clock immediately and then every second
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const calculateSecondAngle = (sec, angleUnit) => {
    let angle;
    if (sec * angleUnit >= 90) {
      angle = parseInt(sec * angleUnit - 90);
    } else {
      angle = parseInt(360 - (90 - sec * angleUnit));
    }
    return angle;
  };

  return (
    <div className="parent">
      <div className="digital"></div>
      <div
        className="watch second"
        style={{
          transform: `rotate(-${calculateSecondAngle(time.second, 6)}deg)`,
          transition: `${time.second == "15" ? "all 0s" : "all 1s linear"}`,
        }}
      >
        {numbers.map((number) => (
          <div
            key={number}
            className="watch-number"
            style={{
              transform: `rotate(${
                number * 6
              }deg) translate(0, -37.5vh) rotate(-${number * 6}deg)`,
            }}
          >
            <span
              className={`${parseInt(time.second) == number && "bold"}`}
              style={{
                transform: `rotate(${calculateSecondAngle(time.second, 6)}deg)`,
                transition: `${
                  time.second == "15" ? "all 0s" : "all 1s linear"
                }`,
              }}
            >
              {number<10 && "0"}{number}
            </span>
          </div>
        ))}
      </div>
      <div
        className="watch minute"
        style={{
          transform: `rotate(-${calculateSecondAngle(time.minute, 6)}deg)`,
          transition: `${time.minute == "15" ? "all 0s" : "all 1s linear"}`,
        }}
      >
        {numbers.map((number) => (
          <div
            key={number}
            className="watch-number"
            style={{
              transform: `rotate(${
                number * 6
              }deg) translate(0, -32vh) rotate(-${number * 6}deg)`,
              transition: `${time.minute == "15" ? "all 0s" : "all 1s linear"}`,
            }}
          >
            <span
              className={`${parseInt(time.minute) == number && "bold"}`}
              style={{
                transform: `rotate(${calculateSecondAngle(time.minute, 6)}deg)`,
              }}
            >
              {number<10 && "0"}{number}
            </span>
          </div>
        ))}
      </div>
      <div
        className="watch hour"
        style={{
          transform: `rotate(-${calculateSecondAngle(time.hour, 30)}deg)`,
          transition: `${time.hour == "3" ? "all 0s" : "all 1s linear"}`,
        }}
      >
        {hours.map((number) => (
          <div
            key={number}
            className="watch-number"
            style={{
              transform: `rotate(${
                number * 30
              }deg) translate(0, -26.7vh) rotate(-${number * 30}deg)`,
              transition: `${time.hour == "3" ? "all 0s" : "all 1s linear"}`,
            }}
          >
            <span
              className={`${parseInt(time.hour) == number && "bold"}`}
              style={{
                transform: `rotate(${calculateSecondAngle(time.hour, 30)}deg)`,
              }}
            >
              {number<10 && "0"}{number}
            </span>
          </div>
        ))}
      </div>
      <div className="watch inside">
        Unique Clock
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default Watch;
