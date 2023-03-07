import Calender from "../components/calender";
import Controllpanel from "../components/controllpanel";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import calendarStore from "../store/calendar";

export default function Home() {
  const { navBoolState } = calendarStore((state) => state);
  return (
    <div className="w-full h-full font-rubik flex flex-col overflow-hidden">
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
