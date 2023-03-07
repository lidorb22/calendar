import { useState, useEffect } from "react";
import {
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
  add,
} from "date-fns";
import useMeasure from "react-use-measure";
import { he } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import calendarStore from "../store/calendar";
import { classNames } from "../store/commonFunctions";

setDefaultOptions({ locale: he });

function Calender() {
  const { setDays, turnChanging, isChangingDays, daysOBJ } = calendarStore(
    (state) => state
  );
  let today = startOfToday();
  useEffect(() => {
    if (!isEqual(today, startOfToday())) {
      return () => {
        today = startOfToday();
      };
    }
  }, []);

  const [currentMonth, setCurrentMonth] = useState(today);
  const [isMonthBarOpen, setIsMonthBarOpen] = useState(false);

  const monthsArr = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  function changeMonth(e) {
    let indexOfCurrentMonth = monthsArr.indexOf(format(currentMonth, "MMMM"));
    if (Number(e.target.id) === indexOfCurrentMonth) return;
    let state;
    if (Number(e.target.id) > indexOfCurrentMonth) {
      state = "P";
    } else {
      state = "M";
    }
    let number = Math.abs(Number(e.target.id) - indexOfCurrentMonth);
    if (state === "P") {
      setCurrentMonth(add(currentMonth, { months: number }));
    } else {
      setCurrentMonth(add(currentMonth, { months: -number }));
    }
    setIsMonthBarOpen(false);
  }

  let daysArray = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const indexOfToday = daysArray.findIndex(
    (day) => day.toString() === today.toString()
  );
  const [indexArr, setIndexArr] = useState([indexOfToday, indexOfToday, 0, 0]);
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
      turnChanging(false);
      const indexNum = Math.abs(indexArr[2] - indexArr[3]) + 1;
      if (indexArr[2] > indexArr[3]) {
        if (indexNum > 8) {
          setIndexArr([indexArr[2] - 7, indexArr[2], 0, 0]);
          setDays(
            eachDayOfInterval({
              start: daysArray[indexArr[2] - 7],
              end: daysArray[indexArr[2]],
            })
          );
          return;
        }
        setIndexArr([indexArr[3], indexArr[2], 0, 0]);
        setDays(
          eachDayOfInterval({
            start: daysArray[indexArr[3]],
            end: daysArray[indexArr[2]],
          })
        );
        return;
      } else {
        if (indexNum > 8) {
          setIndexArr([indexArr[2], indexArr[2] + 7, 0, 0]);
          setDays(
            eachDayOfInterval({
              start: daysArray[indexArr[2]],
              end: daysArray[indexArr[2] + 7],
            })
          );
          return;
        }
        setIndexArr([indexArr[2], indexArr[3], 0, 0]);
        setDays(
          eachDayOfInterval({
            start: daysArray[indexArr[2]],
            end: daysArray[indexArr[3]],
          })
        );
        return;
      }
    }
    turnChanging(true);

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
      <div className="w-full pb-[20px] relative">
        <div
          onClick={() => setIsMonthBarOpen(!isMonthBarOpen)}
          className="flex items-center font-bold gap-[5px] text-peachRed"
        >
          <div>{format(currentMonth, "MMMM")}</div>
          <ChevronDownIcon className="w-[20px]" />
        </div>
        <AnimatePresence>
          {isMonthBarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="bg-white absolute top-[20px] right-[10px] z-10 flex flex-col gap-[10px] px-[20px] text-brownBlack rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              {monthsArr.map((month, i) => (
                <p
                  key={month}
                  id={i}
                  className={`${classNames(
                    month === format(currentMonth, "MMMM") && "text-peachRed",
                    month === format(today, "MMMM") && "font-bold",
                    i === 0 && "pt-[20px]",
                    i === 11 && "pb-[20px]"
                  )}`}
                  onClick={(e) => changeMonth(e)}
                >
                  {month}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
                  className={`h-[25px] pointer-events-none absolute bg-peachRed -z-10 ${classNames(
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
                isChangingDays
                  ? {
                      rotate: [0, 10, 0, -10, 0],
                      transition: { repeat: Infinity, duration: 1.2 },
                    }
                  : { rotate: 0 }
              }
              className={`h-[30px] w-[30px] flex items-center justify-center my-[5px] pointer-events-none ${classNames(
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
