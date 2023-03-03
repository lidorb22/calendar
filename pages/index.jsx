import Navbar from "../components/nav-bar";
import Calender from "../components/calender";
import Controllpanel from "../components/controllpanel";
import calendarStore from "../store/calendar";

export default function Home() {
  const isDaysSelected = calendarStore((state) => state.days);
  return (
    <div className="w-full h-full font-rubik flex flex-col overflow-hidden fixed dir">
      <Navbar />
      <Calender />
      <Controllpanel />
    </div>
  );
}
