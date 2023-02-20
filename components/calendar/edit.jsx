import { useState, useEffect } from "react";
import {
  nextSunday,
  startOfWeek,
  endOfWeek,
  format,
  eachDayOfInterval,
  startOfToday,
  setDefaultOptions,
} from "date-fns";
import { he } from "date-fns/locale";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";

setDefaultOptions({ locale: he });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CalendarEdit({ setEditState, day }) {
  let today = startOfToday();
  let nextWeek = nextSunday(today);
  let weekArray = eachDayOfInterval({
    start: startOfWeek(nextWeek),
    end: endOfWeek(nextWeek),
  });
  return (
    <div className="w-full">
      <div className="w-full flex dir justify-between pb-[10px]">
        <div className="flex dir">
          <p>
            {format(weekArray[0], "dd") + " - " + format(weekArray[6], "dd")}
          </p>
          <p className="pr-[10px]">
            {format(weekArray[0], "MMMM") === format(weekArray[6], "MMMM")
              ? format(weekArray[0], "MMMM")
              : format(weekArray[0], "MMMM") +
                "/" +
                format(weekArray[6], "MMMM")}
          </p>
        </div>
        <div></div>
      </div>
      <div className="w-full border-brownBlack border-[2px] rounded-[5px] bg-white grid gird-cols-7 grid-rows-1 divide-y-[2px] divide-brownBlack/50 dir">
        {weekArray.map((day, i) => (
          <div
            key={i}
            className="h-[50px] flex items-center justify-between px-[20px]"
          >
            <p>{format(day, "EEEE - dd")}</p>
            <ArrowDownCircleIcon className="w-[20px] text-peachRed" />
          </div>
        ))}
      </div>
      <div className="w-full mt-[20px] flex gap-x-[25px] items-center">
        <div className="w-[70px] h-[30px] bg-peachRed text-white font-bold flex items-center justify-center rounded-[5px]">
          <p>הפצה</p>
        </div>
        <p className="text-[14px]" onClick={() => setEditState(false)}>
          ביטול
        </p>
      </div>
    </div>
  );
}

export default CalendarEdit;
