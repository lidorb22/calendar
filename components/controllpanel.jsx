import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { motion, AnimatePresence } from "framer-motion";
import calendarStore from "../store/calendar";
import { format } from "date-fns";
import Input from "./controllpanel/input";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Controllpanel() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const daysOBJ = calendarStore((state) => state.daysOBJ);
  const changeInput = calendarStore((state) => state.changeInput);
  const addPass = calendarStore((state) => state.addPass);
  const applyToAll = calendarStore((state) => state.applyToAll);

  return (
    <div className="w-full h-full py-[15px] text-[14px] text-white px-[20px] overflow-hidden">
      <div className="w-full h-full bg-peachRed flex flex-col p-[20px] rounded-b-[15px] justify-between">
        <div className={`w-full min-h-[30px] flex justify-center`}>
          <div
            className={`h-full flex gap-[20px] bg-brownBlack rounded-[5px] px-[10px] ${classNames(
              daysOBJ.length <= 6 && "justify-center",
              daysOBJ.length > 6 && "justify-start overflow-x-auto"
            )}`}
          >
            {daysOBJ.map((d, i) => (
              <p
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`min-w-[30px] h-full flex items-center justify-center rounded-[5px] text-white/40 
              ${classNames(selectedIndex === i && "text-white/100 font-bold")}
              `}
              >
                {format(d.day, "dd")}
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
          <div className="row-start-1 col-start-3 h-full w-full flex flex-col items-center gap-[15px] overflow-y-auto relative overflow-x-hidden">
            <div className="flex justify-center gap-[5px] sticky top-0">
              <p>הפסקות</p>
              <PlusIcon
                onClick={() => addPass(selectedIndex)}
                className="h-[20px] text-brownBlack"
              />
            </div>
            {daysOBJ[selectedIndex].pass.map((time, i) => (
              <Input key={i} time={time} i={i} selectedIndex={selectedIndex} />
            ))}
          </div>
        </form>
        <div
          className={`w-full min-h-[30px] flex items-end
        ${classNames(
          daysOBJ.length > 1 && "justify-between",
          daysOBJ.length <= 1 && "justify-end"
        )}
        `}
        >
          {daysOBJ.length > 1 && (
            <div
              onClick={() => applyToAll(selectedIndex)}
              className="underline"
            >
              החל על כל הימים!
            </div>
          )}
          <div className="bg-brownBlack h-full flex items-center px-[10px] rounded-[5px]">
            שמירה
          </div>
        </div>
      </div>
    </div>
  );
}
