import { Cog6ToothIcon } from "@heroicons/react/20/solid";

function Navbar() {
  return (
    <div className="w-full p-[20px] flex items-center justify-between">
      <div className="w-[40px] h-[40px] rounded-full bg-[#ef3636] shadow-[0px_4px_4px_rgba(0,0,0,0.5)] flex items-center justify-center">
        <Cog6ToothIcon className="text-white w-[20px]" />
      </div>
      <p className="text-[20px]">
        שלום{" "}
        <span className="font-bold border-[#ef3636] border-b-[2px]">
          לידור בניסתי
        </span>
      </p>
    </div>
  );
}

export default Navbar;
