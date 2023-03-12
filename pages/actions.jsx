import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import calendarStore from "../store/calendar";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Actions() {
  const { navBoolState, user } = calendarStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/business");
    }
  }, [user, router]);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-[20px] gap-[10px]">
      <div className="w-full pb-[10px] flex justify-end">
        <EllipsisVerticalIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <p>פעולות שנעשו היום</p>

      <div className="w-full h-full border-[2px] border-brownBlack rounded-[5px] relative overflow-hidden">
        <div className="w-full h-full flex flex-col gap-[10px] px-[5px] py-[10px] overflow-y-auto">
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
          <div className="w-full bg-brownBlack p-[5px] rounded-[5px] text-white text-[14px] text-center">
            לידור בניסתי קבע תור ליום ראשון 07/03 בשעה 08:00
          </div>
        </div>
      </div>
      <div className="flex gap-[5px] w-full items-center justify-end">
        <p>לפי ימים:</p>
        <input
          type="date"
          className="flex text-[10px] bg-peachRed rounded-[5px] w-[90px] h-[30px]"
        />
        <p>עד</p>
        <input
          type="date"
          className="flex text-[10px] bg-peachRed rounded-[5px] w-[90px] h-[30px]"
        />
      </div>
    </div>
  );
}

export default Actions;
