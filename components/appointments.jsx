import {
  ChevronLeftIcon,
  MapPinIcon,
  TrashIcon,
  BookOpenIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import appStore from "../store/store";
import { useEffect, useState } from "react";
import {
  eachMinuteOfInterval,
  parseISO,
  subMinutes,
  format,
  getDay,
  isFuture,
  isSameDay,
  closestIndexTo,
  isAfter,
  startOfToday,
  endOfWeek,
  eachDayOfInterval,
  isPast,
  endOfDay,
} from "date-fns";
import { classNames } from "../store/commonFunctions";
import { motion } from "framer-motion";
import Notification from "./notification";
import { useRouter } from "next/router";

export function StoreTab(props) {
  const { disconnectStore, appointmentHandler } = appStore((state) => state);
  return (
    <div className="w-full h-[50px] shrink-0 bg-thirty rounded-[5px] flex justify-between items-center px-[10px] text-white">
      <div className="flex flex-col">
        <p className="font-bold ">
          {props.name.length > 28
            ? props.name.substring(0, 28) + "..."
            : props.name}
        </p>
        <div className="flex gap-[5px] items-center">
          {props.type === "store" && <MapPinIcon className="h-[10px]" />}
          <p className="text-[12px]">
            {props.type === "appointment"
              ? format(parseISO(props.details), "EEE הdd/MM בשעה HH:mm")
              : props.details.length > 40
              ? props.details.substring(0, 40) + "..."
              : props.details}
          </p>
        </div>
      </div>
      <div className="flex gap-[20px] items-center text-ten">
        {((props.type === "appointment" &&
          isAfter(parseISO(props.details), startOfToday(new Date()))) ||
          props.type === "store") && (
          <TrashIcon
            onClick={() => {
              if (props.type === "appointment") {
                appointmentHandler(props.storeID, props.day, 30, props.userid);
              } else {
                disconnectStore(props.storeID);
              }
            }}
            className="h-[20px]"
          />
        )}
        {props.type === "appointment" &&
        isAfter(parseISO(props.details), startOfToday(new Date())) ? (
          <ArrowPathIcon className="h-[20px]" />
        ) : (
          props.type === "store" && (
            <Link href={`/appointments/${props.storeID}`}>
              <ChevronLeftIcon className="h-[20px]" />
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export function AppointmentsInbox() {
  const { user } = appStore((state) => state);
  const [isOpen, setOpen] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [oldAppointments, setOldAppointments] = useState([]);
  const [newAppointments, setNewAppointments] = useState([]);
  useEffect(() => {
    const oldArr = [];
    const newArr = [];
    if (user?.appointments?.length > 0) {
      user?.appointments.forEach((appointment, i) => {
        if (isFuture(parseISO(appointment.time.start))) {
          newArr.push(user?.appointments[i]);
        } else {
          oldArr.push(user?.appointments[i]);
        }
      });
    }
    if (isOpen && oldArr.length === 0 && newArr.length === 0) {
      setOpen(false);
    }
    setOldAppointments(oldArr);
    setNewAppointments(newArr);
    setAllAppointments([...newArr, ...oldArr]);
  }, [user]);
  return (
    <motion.div
      initial={{ height: "auto" }}
      animate={isOpen ? { height: "100%" } : { height: "auto" }}
      transition={{ duration: 0.8 }}
      className="w-full h-max bg-white absolute bottom-0 right-0 px-[20px]
      overflow-hidden"
    >
      <div
        className={`${classNames(
          isOpen && "overflow-y-auto"
        )} w-full h-full pb-[20px] border-t-[1px] border-thirty rounded-t-[5px] flex flex-col gap-[20px] items-center mt-[20px] relative`}
      >
        <div
          onClick={() =>
            user?.appointments?.length > 0 ? setOpen(!isOpen) : null
          }
          className="flex gap-[5px] items-center justify-center pt-[5px] "
        >
          <BookOpenIcon className="h-[20px] pointer-events-none" />
          <p className="pointer-events-none">תורים קיימים</p>
        </div>
        {newAppointments.length > 0 && !isOpen ? (
          newAppointments
            .sort((a, b) => parseISO(a.time.start) - parseISO(b.time.start))
            .slice(0, 2)
            .map((appointment) => (
              <StoreTab
                key={appointment._id}
                name={appointment.diary.store.name}
                storeID={appointment.diary.store._id}
                details={appointment.time.start}
                type="appointment"
              />
            ))
        ) : isOpen && oldAppointments.length > 0 ? (
          allAppointments
            .sort((a, b) => parseISO(b.time.start) - parseISO(a.time.start))
            .map((appointment) => (
              <StoreTab
                key={appointment._id}
                name={appointment.diary.store.name}
                storeID={appointment.diary.store._id}
                details={appointment.time.start}
                type="appointment"
                userid={user._id}
                day={appointment.time.start}
              />
            ))
        ) : (
          <EmptyInbox key="noNewAppointments" />
        )}
      </div>
    </motion.div>
  );
}

function EmptyInbox() {
  return <p className="font-bold">לא קיימים תורים חדשים</p>;
}

export function Schedule({ store, selectedDiaryIndex, setSelectedDay }) {
  const [workingTimes, setWorkingTimes] = useState([]);
  const thisWeek = eachDayOfInterval({
    start: parseISO(store.firstdayatweek),
    end: endOfWeek(parseISO(store.firstdayatweek)),
  });
  const cols = [
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];
  useEffect(() => {
    const arrOfWeekTimes = [];
    store.time.forEach((time) => {
      if (isPast(parseISO(time.end))) return;
      const result = eachMinuteOfInterval(
        {
          start: parseISO(time.start),
          end: subMinutes(parseISO(time.end), 30),
        },
        {
          step: 30,
        }
      );
      store.appointments.forEach((appointment) => {
        if (!isSameDay(parseISO(appointment.time.start), result[0])) return;
        const startShiftIndex = closestIndexTo(
          parseISO(appointment.time.start),
          result
        );
        const endShiftIndex = closestIndexTo(
          parseISO(appointment.time.end),
          result
        );
        result.splice(
          startShiftIndex,
          endShiftIndex - startShiftIndex === result.length - 1
            ? result.length
            : endShiftIndex - startShiftIndex
        );
      });
      arrOfWeekTimes.push(result);
    });
    setWorkingTimes(arrOfWeekTimes);
    console.log("appointments");
  }, [store]);
  const lastDayIndex =
    workingTimes.length > 0 && getDay(workingTimes[workingTimes.length - 1][0]);
  return (
    <motion.div
      initial={{ x: -window.innerWidth }}
      animate={{ x: 0 }}
      exit={{ x: -window.innerWidth }}
      transition={{ duration: 0.8 }}
      className="w-full h-full overflow-hidden absolute top-0 right-0"
    >
      <div className="w-full h-full overflow-y-auto relative text-[14px] text-center flex flex-col gap-[10px]">
        <div className="sticky top-0 w-full py-[2px] grid grid-cols-7  gap-x-[2px] justify-items-center px-[5px] text-white bg-thirty rounded-[5px]">
          {thisWeek.map((day) => (
            <div
              key={day}
              className={`${classNames(
                isPast(endOfDay(day)) && "text-white/30"
              )} w-full flex flex-col items-center justify-center`}
            >
              <p>{format(day, "EEE")}</p>
              <p>{format(day, "dd")}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 w-full h-max grid-rows-[repeat(auto-fill,auto-fill)] grid-flow-col justify-items-center px-[5px]">
          {workingTimes.map((diary, index) =>
            diary.map((time, i) => {
              return (
                <div
                  key={i}
                  className={`${classNames(
                    getDay(time) === 0
                      ? `${cols[0]} ${lastDayIndex === 0 && "border-l-[2px]"}`
                      : getDay(time) === 1
                      ? `${cols[1]} ${lastDayIndex === 1 && "border-l-[2px]"}`
                      : getDay(time) === 2
                      ? `${cols[2]} ${
                          lastDayIndex === 2 && "border-l-[2px]"
                        } border-r-[2px]`
                      : getDay(time) === 3
                      ? `${cols[3]} ${
                          lastDayIndex === 3 && "border-l-[2px]"
                        } border-r-[2px]`
                      : getDay(time) === 4
                      ? `${cols[4]} ${
                          lastDayIndex === 4 && "border-l-[2px]"
                        } border-r-[2px]`
                      : getDay(time) === 5
                      ? `${cols[5]} ${
                          lastDayIndex === 5 && "border-l-[2px]"
                        } border-r-[2px]`
                      : getDay(time) === 6 && `${cols[6]} border-r-[2px]`
                  )} w-full col-start-1 pb-[10px] border-ten`}
                  onClick={() => setSelectedDay(time)}
                >
                  <p>{format(time, "HH:mm")}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Verify({ selectedDay, setSelectedDay, user, storeid }) {
  const { appointmentHandler } = appStore((state) => state);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function submit() {
    const { state } = await appointmentHandler(
      storeid,
      selectedDay,
      30,
      user._id
    );
    setOpen(true);
    console.log(state);
  }
  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
        router.push("/appointments");
      }, 3000);
    }

    return () => {
      if (open) {
        clearTimeout(timer);
      }
    };
  }, [open]);

  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: 0 }}
      exit={{ x: window.innerWidth }}
      transition={{ duration: 0.8 }}
      className="w-full h-full overflow-hidden absolute top-0 right-0"
    >
      <Notification trigger={open} massage="התור נשמר בהצלחה!" />
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        <p className="pb-[100px]">
          שלום {user?.name}, <br></br>
          בחרת לקבוע תור{" "}
          <span className="bg-thirty text-white px-[3px]">
            {format(selectedDay, "בEEEE הdd/MM בשעה HH:mm")}
          </span>{" "}
          אם ברצונך לשמור על תור זה לחץ על
          <span className="bg-thirty text-white px-[3px]">שמירה.</span> במידה
          וטעית בפרטים של התור לחץ על{" "}
          <span className="bg-thirty text-white px-[3px]">ביטול.</span>
        </p>
        <div className="flex flex-col gap-[10px] absolute bottom-0 items-center">
          <div
            onClick={() => submit()}
            className="bg-ten rounded-[5px] text-white py-[1px] px-[20px] font-bold"
          >
            <p className="self-center pointer-events-none">שמירה</p>
          </div>
          <p onClick={() => setSelectedDay(null)}>ביטול</p>
        </div>
      </div>
    </motion.div>
  );
}
