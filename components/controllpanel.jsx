import React, { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import calendarStore from "../store/calendar";
import { eachDayOfInterval, format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Controllpanel() {
  const firstAndLastDay = calendarStore((state) => state.days);
  const daysOBJ = calendarStore((state) => state.daysOBJ);
  const changeInput = calendarStore((state) => state.changeInput);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([
    {
      day: 25,
      start: "15:00",
      end: "15:00",
      pass: [],
    },
    {
      day: 26,
      start: "15:00",
      end: "15:00",
      pass: ["15:00", "15:00", "15:00", "15:00", "15:00", "15:00", "15:00"],
    },
    {
      day: 27,
      start: "15:00",
      end: "15:00",
      pass: [],
    },
  ]);
  const [sIndex, setSIndex] = useState(0);

  let daysArray = eachDayOfInterval({
    start: firstAndLastDay[0],
    end: firstAndLastDay[1],
  });

  function handleChange(e, i) {
    const { value, name } = e.target;

    let newState = data[sIndex];

    if (name === "pass") {
      newState.pass[i] = value;
      newState = {
        ...newState,
      };
    } else {
      newState = {
        ...newState,
        [name]: value,
      };
    }
    data[sIndex] = newState;
  }

  useEffect(() => {
    setSelectedIndex(0);
  }, [firstAndLastDay]);

  return (
    <div className="w-full h-full py-[15px] text-[14px] text-white px-[20px] overflow-hidden">
      <div className="w-full h-full bg-peachRed flex flex-col p-[20px] rounded-[15px] justify-between">
        <div className={`w-full min-h-[30px] flex justify-center`}>
          <div
            className={`h-full flex gap-[20px] bg-brownBlack rounded-[5px] px-[10px] ${classNames(
              daysArray.length <= 6 && "justify-center",
              daysArray.length > 6 && "justify-start overflow-x-auto"
            )}`}
          >
            {daysArray.map((d, i) => (
              <p
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`min-w-[30px] h-full flex items-center justify-center rounded-[5px] text-white/40 
              ${classNames(selectedIndex === i && "text-white/100 font-bold")}
              `}
              >
                {format(d, "dd")}
              </p>
            ))}
          </div>
        </div>
        <form className="w-full max-h-full grid grid-cols-3 grid-rows-1 divide-x-2 divide-x-reverse divide-brownBlack py-[40px] overflow-hidden">
          <div className="row-start-1 col-start-1 h-full w-full flex flex-col items-center gap-[15px]">
            <p>שעת התחלה</p>
            <input
              type="time"
              name="start"
              value={daysOBJ[selectedIndex].start}
              onChange={(e) =>
                changeInput(e.target.name, e.target.value, selectedIndex)
              }
              className="text-brownBlack"
            />
          </div>
          <div className="row-start-1 col-start-2 h-full w-full flex flex-col items-center gap-[15px]">
            <p>שעת סיום</p>
            <input
              type="time"
              name="end"
              value={daysOBJ[selectedIndex].end}
              onChange={(e) =>
                changeInput(e.target.name, e.target.value, selectedIndex)
              }
              className="text-brownBlack"
            />
          </div>
          <div className="row-start-1 col-start-3 h-full w-full flex flex-col items-center gap-[15px] overflow-y-auto relative">
            <div className="flex justify-center gap-[5px] sticky top-0">
              <p>הפסקות</p>
              <PlusIcon className="h-[20px] text-brownBlack" />
            </div>
            {daysOBJ[selectedIndex].pass.map((time, i) => (
              <div
                key={i}
                className="flex items-center justify-center gap-[10px] w-full text-brownBlack"
              >
                <input
                  name="pass"
                  type="time"
                  value={time}
                  onChange={(e) =>
                    changeInput(e.target.name, e.target.value, selectedIndex, i)
                  }
                />
                <XMarkIcon className="h-[20px]" />
              </div>
            ))}
          </div>
        </form>
        <div className="w-full min-h-[30px] flex justify-between items-end">
          <div className="underline">החל על כל הימים!</div>
          <div className="bg-brownBlack h-full flex items-center px-[10px] rounded-[5px]">
            שמירה
          </div>
        </div>
      </div>
    </div>
  );
}
