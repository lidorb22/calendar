import calendarStore from "@/store/calendar";
import { ArrowLeftOnRectangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { classNames } from "../store/commonFunctions";

function Navbar() {
  const { navBoolState } = calendarStore((state) => state);
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.8 }}
      className="w-[300px] h-full px-[20px] pt-[20px] pb-[80px] left-0 top-0 absolute bg-white z-10 flex flex-col gap-[20px]"
    >
      <div className="w-full flex justify-end">
        <XMarkIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <div className="w-full h-full relative px-[20px] flex flex-col justify-between">
        <div className="w-[2px] h-full bg-peachRed absolute right-0 top-0"></div>
        <div className="w-full flex flex-col gap-[40px]">
          <p>שלום לידור</p>
          <div className="w-full flex flex-col gap-[15px]">
            <p
              className={`${classNames(
                router.pathname === "/" && "text-peachRed"
              )}`}
            >
              ראשי
            </p>
            <p>הלוחות שלי</p>
            <p>פעולות</p>
            <p>לוח הבקרה</p>
            <p>עיסקי</p>
            <p>הגדרות</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-[10px] text-peachRed">
          <p className="tracking-[0.2em]">יציאה</p>
          <ArrowLeftOnRectangleIcon className="w-[20px]" />
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
