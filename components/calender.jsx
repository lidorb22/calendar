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
  startOfMonth,
} from "date-fns";
import useMeasure from "react-use-measure";
import { he } from "date-fns/locale";
import { motion, AnimatePresence, delay } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

setDefaultOptions({ locale: he });

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Calender({ setEditState }) {
  let today = startOfToday();
  useEffect(() => {
    if (!isEqual(today, startOfToday())) {
      return () => {
        today = startOfToday();
      };
    }
  }, []);

  let daysArray = eachDayOfInterval({
    start: startOfWeek(startOfMonth(today)),
    end: endOfWeek(endOfMonth(today)),
  });

  const indexOfToday = daysArray.findIndex(
    (day) => day.toString() === today.toString()
  );
  const [indexArr, setIndexArr] = useState([indexOfToday, indexOfToday, 0, 0]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [ref, bounds] = useMeasure();

  const cols = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  function daySelection(e) {
    if (e._reactName === "onTouchEnd") {
      setIsSelecting(false);
      if (indexArr[2] > indexArr[3]) {
        setIndexArr([indexArr[3], indexArr[2], 0, 0]);
      } else {
        setIndexArr([indexArr[2], indexArr[3], 0, 0]);
      }
      return;
    }
    setIsSelecting(true);

    // prettier-ignore
    let x = Math.floor((bounds.width - (e.touches[0].clientX - bounds.x)) / (bounds.width / 7));
    // prettier-ignore
    let y = Math.floor((e.touches[0].clientY - bounds.y) / (bounds.height / 5));
    let i;

    //to index
    if (y > 0) {
      i = 7 * y + x;
    } else {
      i = x;
    }

    switch (e._reactName) {
      case "onTouchStart":
        setIndexArr([indexArr[0], indexArr[1], i, i]);
        break;
      case "onTouchMove":
        setIndexArr([indexArr[0], indexArr[1], indexArr[2], i]);
        break;
    }
  }

  return (
    <div className="w-full px-[20px]">
      <div className="w-full flex justify-between items-center  font-bold pb-[20px]">
        <div>{format(today, "MMMM")}</div>
        <div className="flex gap-[20px] text-peachRed">
          <ArrowRightIcon className="h-[20px]" />
          <ArrowLeftIcon className="h-[20px]" />
        </div>
      </div>
      <div className="grid grid-cols-7  w-full pb-[10px] text-[14px]">
        <p className="flex justify-center">א</p>
        <p className="flex justify-center">ב</p>
        <p className="flex justify-center">ג</p>
        <p className="flex justify-center">ד</p>
        <p className="flex justify-center">ה</p>
        <p className="flex justify-center">ו</p>
        <p className="flex justify-center">שבת</p>
      </div>
      <div
        ref={ref}
        onTouchStart={(e) => daySelection(e)}
        onTouchMove={(e) => daySelection(e)}
        onTouchEnd={(e) => {
          daySelection(e);
        }}
        className="grid grid-cols-7  text-[14px] touch-none"
      >
        {daysArray.map((day, dIndex) => (
          <div
            key={day.toString()}
            id={dIndex}
            className={`${classNames(
              dIndex === 0 && cols[getDay(day)],
              dIndex > 6 && "border-gray-300 border-t-[2px]"
            )} w-full flex items-center h-[40px] justify-center relative`}
          >
            <AnimatePresence initial={false}>
              {dIndex >= indexArr[0] && dIndex <= indexArr[1] && (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.2 }}
                  transition={{ duration: 1.2 }}
                  className={`h-[25px] pointer-events-none absolute bg-peachRed ${classNames(
                    dIndex === indexArr[0] && "rounded-r-[5px]",
                    dIndex === indexArr[1] && "rounded-l-[5px]",
                    indexArr[0] !== indexArr[1] && "w-full",
                    indexArr[0] === indexArr[1] && "w-[30px]"
                  )}`}
                ></motion.div>
              )}
            </AnimatePresence>
            <motion.div
              animate={
                isSelecting
                  ? {
                      rotate: [0, 10, 0, -10, 0],
                      transition: { repeat: Infinity, duration: 1.2 },
                    }
                  : { rotate: 0 }
              }
              className={`h-[30px] w-[30px] flex items-center justify-center my-[5px] z-10 pointer-events-none ${classNames(
                isToday(day) && "font-bold text-peachRed",
                !isSameMonth(today, day) && "text-gray-400",
                dIndex >= indexArr[0] && dIndex <= indexArr[1] && "text-white",
                dIndex >= indexArr[0] &&
                  dIndex <= indexArr[1] &&
                  isToday(day) &&
                  "text-black"
              )}`}
            >
              {format(day, "dd")}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
