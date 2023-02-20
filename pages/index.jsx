import Navbar from "../components/nav-bar";
import Calender from "../components/calender";
import Controllpanel from "../components/controllpanel";

export default function Home() {
  return (
    <div className="w-full h-[100vh] font-rubik overflow-hidden flex flex-col">
      <Navbar />
      <Calender />
      <Controllpanel />
    </div>
  );
}
