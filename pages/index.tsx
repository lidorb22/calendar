import Calender from "../components/calender";
import Navbar from "../components/nav-bar";

export default function Home() {
  return (
    <div className="w-full bg-white font-rubik">
      <Navbar />
      <Calender />
    </div>
  );
}
