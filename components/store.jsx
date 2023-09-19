import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  addMonths,
  format,
  setDefaultOptions,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isEqual,
  closestIndexTo,
  isSameDay,
  parseISO,
  isFuture,
  isThisMonth,
  endOfDay,
  isThisWeek,
} from "date-fns";
import { he } from "date-fns/locale";
setDefaultOptions({ locale: he });
import { useEffect, useRef, useState } from "react";
import { classNames } from "../store/commonFunctions";
import { motion } from "framer-motion";
import appStore from "../store/store";
import Notification from "./notification";

export function DayRuler({
  daysWithDiary,
  dayTracker,
  setDayTracker,
  isCreatingNewDiary,
  setIsCreatingNewDiary,
  currentSection,
  setCurrentSection,
}) {
  const { daysOBJ, clearDraft, sameOptionsDraft } = appStore((state) => state);
  const [monthsTracker, setmonthsTracker] = useState(dayTracker);
  const daysArray = eachDayOfInterval({
    start: startOfMonth(monthsTracker),
    end: endOfMonth(monthsTracker),
  });
  const rulerFocus = useRef(null);
  useEffect(() => {
    if (rulerFocus.current !== null) {
      rulerFocus.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [rulerFocus, monthsTracker]);
  return (
    <div className="sticky top-0 bg-white">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center text-ten font-bold">
          <ChevronRightIcon className="h-[20px]" />
          <p onClick={() => setmonthsTracker(addMonths(monthsTracker, -1))}>
            {format(addMonths(monthsTracker, -1), "MMMM")}
          </p>
        </div>
        <p>{format(monthsTracker, "MMMM")}</p>
        <div className="flex items-center text-ten font-bold">
          <p onClick={() => setmonthsTracker(addMonths(monthsTracker, 1))}>
            {format(addMonths(monthsTracker, 1), "MMMM")}
          </p>
          <ChevronLeftIcon className="h-[20px]" />
        </div>
      </div>
      <div className="w-full bg-thirty text-white border-y-[1px] border-peachRed/50 rounded-[5px] overflow-x-auto overflow-y-hidden flex min-h-[60px] items-center px-[10px]">
        {daysArray.map((day, i) => (
          <div
            ref={
              isThisMonth(day) && isToday(day)
                ? rulerFocus
                : i === 0
                ? rulerFocus
                : null
            }
            onClick={() => {
              if (currentSection === 2) {
                if (
                  !daysOBJ.some((item) => isSameDay(day, item.day)) &&
                  !daysWithDiary.some((item) => isSameDay(day, item)) &&
                  isFuture(day) &&
                  isThisWeek(day)
                ) {
                  sameOptionsDraft(endOfDay(day));
                }
                return;
              }
              if (isCreatingNewDiary) setIsCreatingNewDiary(false);
              if (daysOBJ.length > 0) clearDraft();
              if (currentSection !== 2) setCurrentSection(0);
              setDayTracker(endOfDay(day));
            }}
            key={day.toString()}
            className={`${classNames(
              isSameDay(dayTracker, day) && "font-bold text-ten"
            )} flex flex-col min-w-max items-center relative px-[10px]`}
          >
            <p className={`${classNames(isToday(day) && "underline")}`}>
              {isToday(day) ? "היום" : format(day, "EEEEE")}
            </p>
            <p>{format(day, "dd")}</p>
            {isSameDay(
              day,
              daysWithDiary[closestIndexTo(day, daysWithDiary)]
            ) && (
              <div className="w-[8px] h-[2px] rounded-[5px] bg-white absolute bottom-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CreateDiaryElement({ setIsCreatingNewDiary, dayTracker }) {
  const { startNewDraft } = appStore((state) => state);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 w-full h-full right-0 flex flex-col items-center justify-center pointer-events-none pt-[100px]"
    >
      <p>אין לו&quot;ז ביום זה</p>
      {isFuture(dayTracker) &&
        !isToday(dayTracker) &&
        isThisWeek(dayTracker) && (
          <div
            onClick={() => {
              setIsCreatingNewDiary(true);
              startNewDraft(dayTracker);
            }}
            className="bg-ten text-white px-[10px] h-[30px] flex items-center rounded-[5px] gap-[5px] w-max pointer-events-auto"
          >
            <PlusIcon className="h-[20px] pointer-events-none" />
            <p className="pointer-events-none">יצירת לו&quot;ז</p>
          </div>
        )}
    </motion.div>
  );
}

export function ShowDiary({ dayTracker, store, owner }) {
  const { deleteDraft } = appStore((state) => state);
  const [open, setOpen] = useState(false);
  const appointments = [];
  const startEnd = [];
  if (store !== undefined && startEnd.length === 0) {
    startEnd.push(
      ...store?.time.filter((item) =>
        isSameDay(dayTracker, parseISO(item.start))
      )
    );
  }
  store?.appointments.forEach((element, i) => {
    if (isSameDay(dayTracker, parseISO(element.time.start)))
      return appointments.push(store?.appointments[i]);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      key={dayTracker}
    >
      <Notification
        massage="בטוח שברצונך למחוק את היומן הנוכחי"
        action="alert"
        trigger={open}
        onOpenChange={setOpen}
        func={() => deleteDraft(dayTracker, store?._id)}
      />
      <div className="w-full h-max flex flex-col items-center text-[14px] gap-[10px]">
        <p className="text-ten font-bold sticky top-[81px] bg-white w-full text-center">
          תחילת יום -{" "}
          {startEnd[0] !== undefined &&
            format(parseISO(startEnd[0].start), "HH:mm")}
        </p>
        <div className="border-t-ten border-b-ten border-t-[1px] border-b-[1px] rounded-[5px] flex flex-col w-full divide-y-[1px] divide-ten">
          {appointments
            .sort((a, b) => parseISO(a.time.start) - parseISO(b.time.start))
            .map((item) => (
              <TimeTemplate key={item._id} appointment={item} owner={owner} />
            ))}
        </div>
        <p className="text-ten font-bold sticky bottom-0 bg-white w-full text-center pb-[20px]">
          סוף יום -{" "}
          {startEnd[0] !== undefined &&
            format(parseISO(startEnd[0].end), "HH:mm")}
        </p>
      </div>
      {(isFuture(dayTracker) || isToday(dayTracker)) && (
        <div className="border-danger border-[2px] rounded-[5px] flex flex-col w-full p-[10px] gap-[5px]">
          <div className="w-full flex flex-col text-[14px]">
            <p className="font-bold">אזור אדום</p>
            <p>
              בלחיצה על הכפתור האדום ימחק היומן הזה וכל הלקוחות שקבעו תור ביום
              זה יעודכנו על כך.
            </p>
          </div>
          <div
            onClick={() => setOpen(true)}
            className="bg-danger px-[10px] h-[30px] flex items-center rounded-[5px] gap-[5px] w-max self-end text-white"
          >
            <TrashIcon className="h-[20px] pointer-events-none" />
            <p className="pointer-events-none">מחיקה</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function TimeTemplate({ appointment, owner }) {
  const isOwner = owner === appointment?.user?._id;
  return (
    <div className="w-full py-[5px] px-[10px] flex items-center">
      <div className="flex flex-col justify-center gap-[5px]">
        <p>{format(parseISO(appointment.time.start), "HH:mm")}</p>
        {isOwner && (
          <div className="flex">
            <ChevronDoubleLeftIcon className="h-[20px]" />
            <p>{format(parseISO(appointment.time.end), "HH:mm")}</p>
          </div>
        )}
      </div>
      <p className="w-full text-center">
        {isOwner ? "הפסקה" : `רגיל: ${appointment?.user?.name}`}
      </p>
    </div>
  );
}

export function Form({
  currentSection,
  setCurrentSection,
  setIsCreatingNewDiary,
}) {
  const { daysOBJ, setDraft, resetDraft, removeDayFromDraft, updateOwnDiary } =
    appStore((state) => state);
  const [start, setStart] = useState(format(daysOBJ[0].start, "HH:mm"));
  const [end, setEnd] = useState(format(daysOBJ[0].end, "HH:mm"));
  const [breaks, setBreaks] = useState(daysOBJ[0].breaks);
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 right-0 bottom-0 left-0 w-full h-full flex flex-col items-center text-[16px] p-[20px] pt-[150px] pointer-events-none"
    >
      {currentSection === 0 ? (
        <FirstSection
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
      ) : currentSection === 1 ? (
        <SecondSection
          start={start}
          end={end}
          breaks={breaks}
          setBreaks={setBreaks}
        />
      ) : (
        <ThirdSection
          daysOBJ={daysOBJ}
          removeDayFromDraft={removeDayFromDraft}
        />
      )}
      <div className="w-full min-h-max rounded-b-[10px] flex flex-col gap-[20px] items-center justify-center text-white">
        <div className="flex items-center justify-evenly w-full pointer-events-auto">
          {currentSection > 0 && (
            <div
              onClick={() => {
                if (currentSection === 2) resetDraft();
                if (currentSection > 0) setCurrentSection(currentSection - 1);
              }}
              className="bg-ten px-[10px] h-[30px] flex items-center rounded-[5px] gap-[5px]"
            >
              <ChevronRightIcon className="h-[20px] pointer-events-none" />
              <p className="pointer-events-none">הקודם</p>
            </div>
          )}
          <div
            onClick={() => {
              if (currentSection === 2) {
                //setIsCreatingNewDiary(false);
                updateOwnDiary();
                return;
              }
              if (currentSection < 3) setCurrentSection(currentSection + 1);
              if (currentSection < 2)
                setDraft(["start", "end", "breaks"], [start, end, breaks]);
            }}
            className="bg-ten px-[10px] h-[30px] flex items-center rounded-[5px] gap-[5px]"
          >
            <p className="pointer-events-none">
              {currentSection < 2 ? "המשך" : "סיום"}
            </p>
            <ChevronLeftIcon className="h-[20px] pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[34px] h-[34px] rounded-full bg-ten flex items-center justify-center font-bold">
            1
          </div>
          <motion.div
            initial={{
              background: "var(--30, #2C2C2C)",
            }}
            animate={
              currentSection > 0
                ? { background: "var(--10, #E5901A)" }
                : {
                    background: "var(--30, #2C2C2C)",
                  }
            }
            transition={{ duration: 0.8 }}
            className="w-[60px] h-[2px] bg-thirty"
          ></motion.div>
          <motion.div
            initial={{
              background: "var(--30, #2C2C2C)",
            }}
            animate={
              currentSection > 0
                ? { background: "var(--10, #E5901A)" }
                : {
                    background: "var(--30, #2C2C2C)",
                  }
            }
            transition={{ duration: 0.8 }}
            className="w-[34px] h-[34px] rounded-full bg-thirty flex items-center justify-center font-bold"
          >
            2
          </motion.div>
          <motion.div
            initial={{
              background: "var(--30, #2C2C2C)",
            }}
            animate={
              currentSection > 1
                ? { background: "var(--10, #E5901A)" }
                : {
                    background: "var(--30, #2C2C2C)",
                  }
            }
            transition={{ duration: 0.8 }}
            className="w-[60px] h-[2px] bg-thirty"
          ></motion.div>
          <motion.div
            initial={{
              background: "var(--30, #2C2C2C)",
            }}
            animate={
              currentSection > 1
                ? { background: "var(--10, #E5901A)" }
                : {
                    background: "var(--30, #2C2C2C)",
                  }
            }
            transition={{ duration: 0.8 }}
            className="w-[34px] h-[34px] rounded-full bg-thirty flex items-center justify-center font-bold"
          >
            3
          </motion.div>
        </div>
      </div>
    </motion.form>
  );
}

function FirstSection({ start, end, setStart, setEnd }) {
  return (
    <div className="w-full h-full flex items-center justify-evenly">
      <div className="flex flex-col gap-[5px] items-center">
        <p>תחילת יום</p>
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="bg-thirty rounded-[5px] w-[75px] h-[30px] text-white pointer-events-auto"
        />
      </div>
      <div className="flex flex-col gap-[5px] items-center">
        <p>סוף יום</p>
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="bg-thirty rounded-[5px] w-[75px] h-[30px] text-white pointer-events-auto"
        />
      </div>
    </div>
  );
}

function SecondSection({ breaks, setBreaks, start, end }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-[10px] overflow-hidden pb-[20px]">
      <h1>הפסקות</h1>
      <div
        onClick={() =>
          setBreaks((old) =>
            old.length === 0 ? [[start, end]] : [...old, old[old.length - 1]]
          )
        }
        className="text-ten font-bold flex items-center rounded-[5px] gap-[5px] pointer-events-auto"
      >
        <PlusIcon className="h-[20px] pointer-events-none" />
        <p className="pointer-events-none">הוספת הפסקה</p>
      </div>
      <div className="w-full h-max max-h-[280px] flex flex-col items-center gap-[10px] overflow-y-auto pointer-events-auto">
        {breaks.length > 0 &&
          breaks.map((item, i) => (
            <SecondSectionInput
              key={i}
              setBreaks={setBreaks}
              item={item}
              i={i}
              start={start}
              end={end}
            />
          ))}
      </div>
    </div>
  );
}

function SecondSectionInput({ setBreaks, item, i, start, end }) {
  return (
    <div className="flex flex-col items-end justify-center gap-[5px] relative">
      <div className="flex items-center gap-[10px] relative">
        <p className="absolute left-full pl-[10px]">התחלה</p>
        <input
          type="time"
          value={item[0]}
          min={start}
          max={item[1]}
          onChange={(e) => {
            if (!e.target.validity.valid) return;
            setBreaks((old) => {
              let arr;
              if (Object.isFrozen(...old)) {
                arr = JSON.parse(JSON.stringify([...old]));
              } else {
                arr = [...old];
              }
              arr[i].splice(0, 1, e.target.value);
              return arr;
            });
          }}
          className="bg-thirty rounded-[5px] w-[75px] h-[30px] text-white"
        />
      </div>
      <XMarkIcon
        onClick={() => {
          setBreaks((old) => {
            let arr = [...old];
            arr.splice(i, 1);
            return arr;
          });
        }}
        className="h-[20px] absolute right-full pr-[10px]"
      />
      <div className="flex items-center gap-[10px] relative">
        <p className="absolute left-full pl-[10px]">סוף</p>
        <input
          type="time"
          value={item[1]}
          min={item[0]}
          max={end}
          onChange={(e) => {
            if (!e.target.validity.valid) return;
            setBreaks((old) => {
              let arr;
              if (Object.isFrozen(...old)) {
                arr = JSON.parse(JSON.stringify([...old]));
              } else {
                arr = [...old];
              }
              arr[i].splice(1, 1, e.target.value);
              return arr;
            });
          }}
          className="bg-thirty rounded-[5px] w-[75px] h-[30px] text-white"
        />
      </div>
    </div>
  );
}

function ThirdSection({ daysOBJ, removeDayFromDraft }) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-[10px] overflow-hidden pb-[20px] justify-center">
      <h1>החל על ימים אחרים</h1>
      {daysOBJ.length === 1 ? (
        <p className="text-center text-[14px] text-ten">
          לחצו על אחד הימים כדי שיהיה לו את אותו הלו”ז. אם אינכם רוצים להוסיף
          ימים לחצו על סיום.
        </p>
      ) : (
        <div className="w-max h-max max-h-[280px] flex flex-col items-center gap-[10px] overflow-y-auto pointer-events-auto">
          {daysOBJ.map((item, index) => (
            <p
              key={index}
              onClick={() => removeDayFromDraft(index)}
              className={`${classNames(index === 0 && "hidden")} text-ten`}
            >
              {format(item.day, "EEEE ה-dd/MM/yyyy")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
