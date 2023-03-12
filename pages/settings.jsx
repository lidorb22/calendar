import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import { useEffect } from "react";
import calendarStore from "../store/calendar";
import { useRouter } from "next/router";

function Settings() {
  const { navBoolState, user } = calendarStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/business");
    }
  }, []);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-[20px]">
      <div className="w-full pb-[40px] flex justify-end">
        <EllipsisVerticalIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <div className="w-full flex flex-col gap-[30px]">
        <Info />
        <Verification />
        {user?.contractType === "business" && <Busisness />}
        {user?.contractType === "business" && <WorkingTable />}
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between text-peachRed font-bold items-center">
          <p>פרטים אישיים</p>
          <PencilSquareIcon className="w-[20px]" />
        </div>
        <p>שם מלא: לידור בניסתי</p>
        <p>אימייל: lidor@gmail.com</p>
        <p>טלפון: 055-555-5555</p>
      </div>
    </div>
  );
}
function Verification() {
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between text-peachRed font-bold items-center">
          <p>דרכי אימות</p>
          <PencilSquareIcon className="w-[20px]" />
        </div>
        <p>שליחת אימות לטלפון</p>
      </div>
    </div>
  );
}
function Busisness() {
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between text-peachRed font-bold items-center">
          <p>עיסקי</p>
          <PencilSquareIcon className="w-[20px]" />
        </div>
        <p>שם החבילה: בסיסי</p>
        <p>עלות החבילה: 50 בחודש</p>
        <p>תוקף: 05/08/23</p>
      </div>
    </div>
  );
}
function WorkingTable() {
  return (
    <div className="w-full flex flex-col gap-[40px]">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between text-peachRed font-bold items-center">
          <p>לוח עבודה</p>
          <PencilSquareIcon className="w-[20px]" />
        </div>
        <p>הפסקות קבועות: ללא</p>
        <p>שעות התחלה קבועות: ללא</p>
        <p>שעות סיום קבועות: ללא</p>
        <p>זמן לתור: 30 דק'</p>
      </div>
    </div>
  );
}

export default Settings;
