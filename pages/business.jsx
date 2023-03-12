import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import calendarStore from "../store/calendar";

function Business() {
  const { navBoolState } = calendarStore((state) => state);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden p-[20px]">
      <div className="w-full pb-[20px] flex justify-end">
        <EllipsisVerticalIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-[5px] text-[14px]">
          <p>לוגו</p>
          <p className="text-[16px]">אודותינו</p>
          <p>
            פשוט לקבוע הוא אתר שעוזר לבעלי עסקים שמתעסקים עם תורים לנהל את יומן
            העסק שלהם בפשטות ובלי כל מאמץ!
          </p>
          <p>
            <span className="text-peachRed underline">מאיפה מתחילים?</span>{" "}
            פותחים משתמש, רוכשים את אחד מהחוזים המתאים לכם, מסדרים את ההגדרות
            לעסק שלכם ושולחים ללקוחות את קישור הברקוד ליומן שלכם וזהו כל כך
            פשוט!
          </p>
          <p>
            <span className="text-peachRed underline">כמה פשוט?</span> כל יומן
            העבודה שלכם עובר לדיגיטל בלי צורך בניירת!
          </p>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-[20px]">
          <p className="font-bold text-peachRed text-[32px]">עיסקי</p>
          <div className="w-full flex flex-col gap-[10px]">
            <div className="flex items-center text-center w-full border-b-[2px] border-peachRed pb-[10px]">
              <p className="w-full border-l-[2px]">בסיס</p>
              <p className="w-full border-l-[2px]">מדיום</p>
              <p className="w-full">לארג'</p>
            </div>
            <div className="w-full grid grid-cols-3 text-center">
              <div className="border-l-[2px] border-b-[2px] h-[40px] flex items-center justify-center text-[14px]">
                התראות
              </div>
              <div className="col-start-2 col-end-4 border-b-[2px] h-[40px] flex items-center justify-center">
                number
              </div>
              <div className="border-l-[2px] border-b-[2px] h-[40px] flex items-center justify-center text-[14px]">
                לקוחות
              </div>
              <div className="col-start-2 col-end-4 border-b-[2px] h-[40px] flex items-center justify-center">
                number
              </div>
              <div className="border-l-[2px] h-[40px] flex items-center justify-center text-[14px]">
                יומנים
              </div>
              <div className="col-start-2 col-end-4 h-[40px] flex items-center justify-center">
                number
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-[10px] items-center">
            <p>סה"כ: 500 / חודש</p>
            <p className="bg-peachRed rounded-[5px] px-[10px] py-[5px] text-white tracking-[0.2em]">
              רכישת החוזה
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business;
