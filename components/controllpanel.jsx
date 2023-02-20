import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Controllpanel() {
  const arr = [
    {
      day: "08",
      start: "08:00",
      end: "18:00",
      break: [
        ["12:00", "12:40"],
        ["15:00", "15:40"],
      ],
    },
    {
      day: "09",
      start: "08:00",
      end: "18:00",
      break: [
        ["12:00", "12:40"],
        ["15:00", "15:40"],
      ],
    },
    {
      day: "10",
      start: "",
      end: "",
      break: [["12:00", "12:40"]],
    },
    {
      day: "11",
      start: "08:00",
      end: "18:00",
      break: [
        ["12:00", "12:40"],
        ["15:00", "15:40"],
      ],
    },
    {
      day: "12",
      start: "",
      end: "",
      break: [],
    },
  ];
  const [selectedDay, setSelectedDay] = useState(arr[0]);
  console.log(selectedDay);
  return (
    <div className="w-full h-full pt-[20px] text-[14px] text-white overflow-hidden">
      <div className="w-full h-full bg-peachRed flex flex-col p-[20px]">
        <div
          className={`w-full min-h-[30px] flex dir overflow-auto gap-[20px] ${classNames(
            arr.length > 5 && "justify-between",
            arr.length <= 5 && "justify-center"
          )}`}
        >
          {arr.map((item, index) => (
            <p
              key={index}
              onClick={() => setSelectedDay(arr[index])}
              className={`min-w-[30px] h-full flex items-center justify-center rounded-[5px] ${classNames(
                selectedDay.day === item.day && "bg-brownBlack font-bold"
              )}`}
            >
              {item.day}
            </p>
          ))}
        </div>
        <form className="w-full h-full py-[20px] flex flex-col dir gap-[20px] overflow-auto">
          <div className="flex items-center dir gap-[20px]">
            <label>תחילת משמרת</label>
            <input
              type="time"
              className="bg-red-800"
              value={selectedDay.start}
            />
          </div>
          <div className="flex items-center dir gap-[20px]">
            <label>סוף משמרת</label>
            <input type="time" className="bg-red-800" value={selectedDay.end} />
          </div>
          <div className="flex gap-[15px] items-center">
            <p>שעות מנוחה</p>
            <PlusCircleIcon className="h-[18px]" />
          </div>
          {selectedDay.break.map((item) => (
            <div className="flex items-center dir gap-[20px]">
              <p>מ-</p>
              <input type="time" value={item[0]} className="bg-red-800" />
              <p>עד-</p>
              <input type="time" value={item[1]} className="bg-red-800" />
            </div>
          ))}
        </form>
        <div className="w-full min-h-[30px] flex justify-between items-end">
          <div className="bg-brownBlack h-full flex items-center px-[10px] rounded-[5px]">
            שמירה
          </div>
          <div className="underline">החל שינויים על כל הימים</div>
        </div>
      </div>
    </div>
  );
}
