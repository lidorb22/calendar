import calendarStore from "../store/calendar";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Calender from "./calender";
import Controllpanel from "./controllpanel";

function BusinessCalander() {
  const { navBoolState } = calendarStore((state) => state);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full p-[20px] flex justify-end">
        <EllipsisVerticalIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <Calender />
      <Controllpanel />
    </div>
  );
}

export default BusinessCalander;
