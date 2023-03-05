import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import calendarStore from "../../store/calendar";

function Input({ time, i, selectedIndex }) {
  const [timeInput, setTimeInput] = useState(time);
  const changeInput = calendarStore((state) => state.changeInput);
  const removePass = calendarStore((state) => state.removePass);

  useEffect(() => {
    setTimeInput(time);
  }, [time]);

  return (
    <div className="flex items-center justify-center w-full min-h-max text-brownBlack gap-[5px]">
      <div className="flex flex-col items-center justify-center w-max h-full gap-[10px]">
        <input
          name="pass"
          type="time"
          value={timeInput.start}
          onChange={(e) =>
            changeInput(
              e.target.name,
              e.target.value,
              selectedIndex,
              i,
              "start"
            )
          }
          className="w-[70px] self-start"
        />
        <input
          name="pass"
          type="time"
          value={timeInput.end}
          onChange={(e) =>
            changeInput(e.target.name, e.target.value, selectedIndex, i, "end")
          }
          className="w-[70px] self-start"
        />
      </div>
      <div className="w-[10px] h-3/4 border-black border-t-[3px] border-l-[3px] border-b-[3px] left-[10px] flex items-center ">
        <XMarkIcon
          onClick={() => removePass(i, selectedIndex)}
          className="min-h-[20px] min-w-[20px] bg-peachRed"
        />
      </div>
    </div>
  );
}

export default Input;
