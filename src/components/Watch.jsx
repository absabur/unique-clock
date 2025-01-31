"use client";

import React, { useEffect, useState } from "react";
import "./Watch.css"; // Import the CSS file

const Watch = () => {
  const [render, setRender] = useState(false);
  const numbers = Array.from({ length: 60 }, (_, i) => i + 1);
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
    ampm: "",
  });

  const [unit, setUnit] = useState("dvh");

  useEffect(() => {
    const handleResize = () => {
      setUnit(window.innerWidth > window.innerHeight ? "dvh" : "vw");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      setTime({
        hour: formattedHour.toString().padStart(2, "0"),
        minute: minute.toString().padStart(2, "0"),
        second: second.toString().padStart(2, "0"),
        ampm,
      });
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    setRender(true)
    return () => clearInterval(interval);
  }, []);

  const calculateSecondAngle = (sec, angleUnit) => {
    let angle =
      sec * angleUnit >= 90
        ? sec * angleUnit - 90
        : 360 - (90 - sec * angleUnit);
    return parseInt(angle);
  };

  return (
    <>
    {
      render ? 
      <div className="parent">
      <div className="ampm">{time.ampm}</div>
      {["second", "minute", "hour"].map((type, index) => (
        <div
          key={type}
          className={`watch ${type}`}
          style={{
            transform: `rotate(-${calculateSecondAngle(
              time[type],
              index === 2 ? 30 : 6
            )}deg)`,
            transition: `${
              time[type] == (index === 2 ? "3" : "15")
                ? "all 0s"
                : "all 1s linear"
            }`,
          }}
        >
          {(index === 2 ? hours : numbers).map((number) => (
            <div
              key={number}
              className="watch-number"
              style={{
                transform: `rotate(${
                  number * (index === 2 ? 30 : 6)
                }deg) translate(0, -${
                  index === 2 ? 26.7 : index === 1 ? 32 : 37.5
                }${unit}) rotate(-${number * (index === 2 ? 30 : 6)}deg)`,
              }}
            >
              <span
                className={`${parseInt(time[type]) == number % 60 && "bold"}`}
                style={{
                  transform: `rotate(${calculateSecondAngle(
                    time[type],
                    index === 2 ? 30 : 6
                  )}deg)`,
                  transition: `${
                    time[type] == (index === 2 ? "3" : "15")
                      ? "all 0s"
                      : "all 1s linear"
                  }`,
                }}
              >
                {index === 2 ? number < 10 : number % 60 < 10 && "0"}
                {index === 2 ? number : number % 60}
              </span>
            </div>
          ))}
        </div>
      ))}
      <div className="watch inside">
        Unique Clock <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div> 
    :
    <div className="loading"></div>
    }
    </>
  );
};

export default Watch;
