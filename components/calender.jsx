import startOfToday from "date-fns/startOfToday";
import endOfMonth from "date-fns/endOfMonth";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import format from "date-fns/format";
import endOfWeek from "date-fns/endOfWeek";
import isToday from "date-fns/isToday";
import { useState } from "react";
import isEqual from "date-fns/isEqual";
import getDay from "date-fns/getDay";
import startOfWeek from "date-fns/startOfWeek";
import isSameMonth from "date-fns/isSameMonth";
import nextSunday from "date-fns/nextSunday";
import isSameWeek from "date-fns/isSameWeek";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import { he } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Calender() {
  setDefaultOptions({ locale: he });
  let today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);

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

  return (
    <div className="w-full p-[20px]">
      <div className="w-full flex justify-end pb-[10px]">
        {format(today, "MMMM")}
      </div>
      <div className="grid grid-cols-7 bg-[#ef3636] rounded-t-[5px] text-white px-[5px] dir h-[50px] items-center">
        <div className="h-8 flex items-center justify-center">ראשון</div>
        <div className="h-8 flex items-center justify-center">שני</div>
        <div className="h-8 flex items-center justify-center">שלישי</div>
        <div className="h-8 flex items-center justify-center">רביעי</div>
        <div className="h-8 flex items-center justify-center">חמישי</div>
        <div className="h-8 flex items-center justify-center">שישי</div>
        <div className="h-8 flex items-center justify-center">שבת</div>
      </div>
      <div className="grid grid-cols-7 dir border-[#241515] border-x-[2px] border-b-[2px] rounded-b-[5px] px-[5px]">
        {daysArray.map((day, i) => (
          <div
            key={day.toString()}
            className={`${classNames(
              i === 0 && cols[getDay(day)],
              i > 6 && "border-t-[2px] border-[#241515]/40"
            )} w-full flex items-center justify-center py-[5px]`}
          >
            <div
              className={`h-[30px] flex items-center justify-center my-[5px] ${classNames(
                isToday(day) &&
                  !isEqual(selectedDay, today) &&
                  "border-[#ef3636] border-b-[2px] text-black w-[30px]",
                isEqual(selectedDay, day) &&
                  !isSameWeek(nextSunday(today), day) &&
                  "bg-[#241515] rounded-[5px] text-white w-[30px]",
                isSameWeek(nextSunday(today), day) &&
                  isEqual(selectedDay, day) &&
                  "bg-[#241515] text-white w-full ",
                isSameWeek(nextSunday(today), day) &&
                  "bg-[#ef3636] text-white w-full ",
                isEqual(lastDayOfWeek(nextSunday(today)), day) &&
                  "rounded-l-[5px]",
                isEqual(nextSunday(today), day) && "rounded-r-[5px]",
                !isSameMonth(day, today) && "text-gray-300"
              )}`}
              onClick={() => setSelectedDay(day)}
            >
              {format(day, "dd")}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full mt-[20px]">
        <div className="w-[70px] h-[30px] bg-[#241515]/30 rounded-[5px] font-bold text-white flex items-center justify-center">
          <p>שמירה</p>
        </div>
        <div className="text-[14px] underline">העתקת הלוז לשבוע הבא</div>
      </div>
    </div>
  );
}

export default Calender;
