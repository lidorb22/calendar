import Calender from "../components/calender";
import Navbar from "../components/nav-bar";
import Options from "../components/options";

export default function Home() {
  return (
    <div className="w-full bg-white font-rubik px-[20px]">
      <Navbar />
      <Calender />
      <Options />
    </div>
  );
}
