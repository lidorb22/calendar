import Navbar from "../components/nav-bar";
import Calender from "../components/calendar/calender";

export default function Home() {
  return (
    <div className="w-full bg-white font-rubik px-[20px] overflow-hidden">
      <Navbar />
      <Calender />
    </div>
  );
}
