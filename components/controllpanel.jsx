import React, { useState } from "react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Controllpanel() {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");

  return (
    <div className="w-full h-full pt-[10px] text-[14px] text-white">
      <div className="w-full h-full bg-peachRed flex flex-col p-[20px]">
        <div className={`w-full min-h-[30px] flex gap-[20px] justify-center`}>
          <p
            className={`min-w-[30px] h-full flex items-center justify-center rounded-[5px]`}
          >
            08
          </p>
        </div>
        <form className="w-full h-full py-[20px] flex flex-col gap-[20px]">
          <div className="flex items-center gap-[20px]">
            <label>תחילת משמרת</label>
            <input
              type="time"
              className="bg-red-800 rounded-[5px]"
              value={startInput}
              onChange={(e) => setStartInput(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <label>סוף משמרת</label>
            <input
              type="time"
              className="bg-red-800 rounded-[5px]"
              value={endInput}
              onChange={(e) => setEndInput(e.target.value)}
            />
          </div>
          <div className="flex gap-[15px] items-center">
            <p>שעות מנוחה</p>
            <PlusCircleIcon className="h-[18px]" />
          </div>
          <div
            className={`h-[60px] w-full overflow-auto bg-white/20 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] px-[10px] rounded-[5px]`}
          ></div>
        </form>
        <div className="w-full min-h-[30px] flex justify-between items-end">
          <div className="underline">החל שינויים על כל הימים</div>
          <div className="bg-brownBlack h-full flex items-center px-[10px] rounded-[5px]">
            שמירה
          </div>
        </div>
      </div>
    </div>
  );
}
