import { useState, useEffect } from "react";
import {
  lastDayOfWeek,
  isSameWeek,
  nextSunday,
  isSameMonth,
  startOfWeek,
  getDay,
  isEqual,
  isToday,
  endOfWeek,
  format,
  eachDayOfInterval,
  endOfMonth,
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

function Calender() {
  const [editState, setEditState] = useState(false);
  return (
    <div className="w-full py-[20px] grid grid-cols-1 grid-rows-1">
      <motion.div
        animate={editState ? { opacity: 0 } : { opacity: 1 }}
        className="w-full col-start-1 row-start-1"
      >
        <CalenderDisplay setEditState={setEditState} />
      </motion.div>
      {/*
        <motion.div
        animate={editState ? { opacity: 1 } : { opacity: 0 }}
        initial={{ opacity: 0, pointerEvents: "none" }}
        className="w-full col-start-1 row-start-1"
        >
        <WeekDisplay setEditState={setEditState} />
  </motion.div>*/}
    </div>
  );
}

function CalenderDisplay({ setEditState }) {
  let today = startOfToday();
  useEffect(() => {
    if (!isEqual(today, startOfToday())) {
      return () => {
        today = startOfToday();
      };
    }
  }, []);
  const [selectedDayState, setSelectedDayState] = useState(today);

  const cols = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  let daysArray = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(endOfMonth(today)),
  });

  function selectedDay(day) {
    setSelectedDayState(day);
    //setEditState(true);
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-end pb-[10px]">
        {format(today, "MMMM")}
      </div>
      <div className="grid grid-cols-7 bg-peachRed rounded-t-[5px] text-white px-[5px] dir h-[50px] items-center">
        <div className="h-8 flex items-center justify-center">ראשון</div>
        <div className="h-8 flex items-center justify-center">שני</div>
        <div className="h-8 flex items-center justify-center">שלישי</div>
        <div className="h-8 flex items-center justify-center">רביעי</div>
        <div className="h-8 flex items-center justify-center">חמישי</div>
        <div className="h-8 flex items-center justify-center">שישי</div>
        <div className="h-8 flex items-center justify-center">שבת</div>
      </div>
      <div className="grid grid-cols-7 dir border-brownBlack border-x-[2px] border-b-[2px] rounded-b-[5px] px-[5px]">
        {daysArray.map((day, i) => (
          <div
            key={day.toString()}
            className={`${classNames(
              i === 0 && cols[getDay(day)],
              i > 6 && "border-t-[2px] border-brownBlack/40"
            )} w-full flex items-center justify-center py-[5px]`}
          >
            <div
              className={`h-[30px] flex items-center justify-center my-[5px] ${classNames(
                isToday(day) &&
                  !isEqual(selectedDayState, today) &&
                  "border-peachRed border-b-[2px] text-black w-[30px]",
                isEqual(selectedDayState, day) &&
                  !isSameWeek(nextSunday(today), day) &&
                  "bg-brownBlack rounded-[5px] text-white w-[30px]",
                isSameWeek(nextSunday(today), day) &&
                  isEqual(selectedDayState, day) &&
                  "bg-brownBlack text-white w-full ",
                isSameWeek(nextSunday(today), day) &&
                  "bg-peachRed text-white w-full ",
                isEqual(lastDayOfWeek(nextSunday(today)), day) &&
                  "rounded-l-[5px]",
                isEqual(nextSunday(today), day) && "rounded-r-[5px]",
                !isSameMonth(day, today) && "text-gray-300"
              )}`}
              onClick={() => selectedDay(day)}
            >
              {format(day, "dd")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekDisplay({ setEditState, day }) {
  let today = startOfToday();
  let nextWeek = nextSunday(today);
  let firstDayOfWeek = startOfWeek(nextWeek);
  let lastDayOfWeek = endOfWeek(nextWeek);
  return (
    <div className="w-full">
      <div className="w-full flex dir pb-[10px]">
        <p>
          {format(firstDayOfWeek, "dd") + " - " + format(lastDayOfWeek, "dd")}
        </p>
        <p className="pr-[10px]">
          {format(firstDayOfWeek, "MMMM") === format(lastDayOfWeek, "MMMM")
            ? format(firstDayOfWeek, "MMMM")
            : format(firstDayOfWeek, "MMMM") +
              "/" +
              format(lastDayOfWeek, "MMMM")}
        </p>
      </div>
      <div className="w-full border-brownBlack border-[2px] rounded-[5px] bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.5)] grid gird-cols-7 grid-rows-1 divide-y-[2px] divide-brownBlack/50 dir px-[20px]">
        <div className="h-[50px] flex items-center justify-between">
          <p>asdasd</p>
          <ArrowDownCircleIcon className="w-[20px] text-peachRed" />
        </div>
      </div>
    </div>
  );
}

export default Calender;
