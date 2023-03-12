import {
  ChevronDownIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  QrCodeIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfToday,
  startOfWeek,
} from "date-fns";
import calendarStore from "../store/calendar";
import { classNames } from "../store/commonFunctions";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Appointment() {
  const { navBoolState } = calendarStore((state) => state);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden px-[20px] pb-[20px] gap-[20px]">
      <div
        className={`w-full py-[20px] flex ${classNames(
          selectedBusiness === null ? "justify-end" : "justify-between"
        )}`}
      >
        <AnimatePresence initial={false}>
          {selectedBusiness !== null && (
            <motion.div
              initial={{
                x: "100vw",
                position: "static",
                pointerEvents: "none",
              }}
              animate={{ x: 0, pointerEvents: "auto" }}
              exit={{
                x: "100vw",
                position: "absolute",
                pointerEvents: "none",
                top: "20px",
                right: "20px",
              }}
              transition={{ duration: 0.8 }}
            >
              <ChevronLeftIcon
                onClick={() => setSelectedBusiness(null)}
                className="h-[20px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <EllipsisVerticalIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      <div className="w-full h-full relative">
        <AnimatePresence initial={false}>
          {selectedBusiness === null && (
            <Main key="main" setSelectedBusiness={setSelectedBusiness} />
          )}
          {selectedBusiness !== null && (
            <Diary key="diary" selectedBusiness={selectedBusiness} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Main({ setSelectedBusiness }) {
  const arr = [
    {
      id: Math.floor(Math.random() * 100),
      name: "המספרה של אריאל",
    },
    {
      id: Math.floor(Math.random() * 100),
      name: "הציפורניים של אתי",
    },
    {
      id: Math.floor(Math.random() * 100),
      name: "גבות אורנית",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={{ x: "-100vw", position: "relative", pointerEvents: "none" }}
      animate={{ x: 0, pointerEvents: "auto" }}
      exit={{ x: "-100vw", position: "absolute", pointerEvents: "none" }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col justify-between gap-[40px] overflow-hidden relative"
    >
      <AnimatePresence>
        {isOpen && <Inbox setIsOpen={setIsOpen} />}
      </AnimatePresence>
      <div className="w-full flex flex-col h-full overflow-y-auto gap-[20px]">
        {arr.map((table, i) => (
          <BusinessTag
            setSelectedBusiness={setSelectedBusiness}
            key={i}
            id={table.id}
            titleText={table.name}
          />
        ))}
      </div>
      <div className="w-full flex min-h-[90px] justify-between items-center text-center text-white font-bold">
        <div
          onClick={() => setIsOpen(true)}
          className="w-[90px] h-full bg-peachRed rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.5)] flex items-center justify-center"
        >
          <p>תורים שקבעתי</p>
        </div>
        <div className="w-[90px] h-full bg-peachRed rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
          <QrCodeIcon className="w-[50px]" />
          <p>הוספת לוח</p>
        </div>
      </div>
    </motion.div>
  );
}

function Inbox({ setIsOpen }) {
  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "100vh" }}
      transition={{ ease: [0.42, 0, 0.58, 1], duration: 1.6 }}
      className="w-full absolute top-0 bottom-0 bg-peachRed right-0 rounded-[5px] py-[20px] text-white  flex flex-col items-center justify-between"
    >
      <div className="w-full h-full flex flex-col px-[15px] gap-[20px] overflow-y-auto items-center">
        <p className="font-bold sticky top-0 w-full text-center bg-peachRed">
          תורים שקבעתי
        </p>
        <InboxElement />
      </div>
      <XMarkIcon onClick={() => setIsOpen(false)} className="h-[20px]" />
    </motion.div>
  );
}

function InboxElement() {
  return (
    <div className="w-full h-[65px] rounded-[5px] bg-brownBlack flex justify-between p-[10px] text-[14px]">
      <div className="flex flex-col justify-between">
        <p className="font-bold text-[16px]">המספרה של אריאל</p>
        <p>07/03 יום ראשון בשעה 08:00</p>
      </div>
      <div className="flex flex-col divide-y-2 divide-peachRed justify-between">
        <div className="h-full flex items-start justify-center">שינוי התור</div>
        <div className="h-full flex items-end justify-center">ביטול התור</div>
      </div>
    </div>
  );
}

function BusinessTag({ titleText, setSelectedBusiness }) {
  return (
    <div className="w-full min-h-[50px] flex items-center justify-between px-[10px] bg-brownBlack text-white rounded-[5px]">
      <p className="font-bold">{titleText}</p>
      <div className="w-[110px] h-[20px] flex justify-between">
        <TrashIcon className="h-full" />
        <MapPinIcon className="h-full" />
        <ChevronLeftIcon
          onClick={() => setSelectedBusiness(titleText)}
          className="h-full"
        />
      </div>
    </div>
  );
}

function Diary({ selectedBusiness }) {
  let today = startOfToday();
  let daysArray = eachDayOfInterval({
    start: startOfWeek(today),
    end: endOfWeek(today),
  });
  const dataArr = [
    {
      day: daysArray[0],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[1],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[2],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[3],
      aveilable: [
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[4],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[5],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
      ],
    },
    {
      day: daysArray[6],
      aveilable: [
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
      ],
    },
  ];
  const [selectedDay, setSelectedDay] = useState(null);
  return (
    <motion.div
      initial={{ x: "100vw", position: "static", pointerEvents: "none" }}
      animate={{ x: 0, pointerEvents: "auto" }}
      exit={{ x: "100vw", position: "absolute", pointerEvents: "none" }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col justify-between gap-[20px] overflow-hidden relative"
    >
      <div className="w-full flex justify-between items-center text-peachRed">
        <p className="font-bold">{selectedBusiness}</p>
        <div className="flex items-center">
          <p>
            {format(dataArr[6].day, "dd") +
              " - " +
              format(dataArr[0].day, "dd")}
          </p>
          <ChevronDownIcon className="w-[20px]" />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {selectedDay !== null && (
          <ChackPoint
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        )}
      </AnimatePresence>
      <div className="grid grid-cols-7 w-full h-full overflow-y-auto divide-x-2 divide-x-reverse text-[14px]">
        {dataArr.map((data) => (
          <div
            key={data.day}
            className="w-full h-full flex flex-col items-center gap-[10px]"
          >
            <p>{format(data.day, "EEEEE")}</p>
            {data.aveilable.map((time, i) => (
              <p
                key={time}
                className={`w-full text-center ${classNames(
                  i % 2 ? "bg-white" : "bg-gray-100"
                )}`}
                onClick={() => setSelectedDay({ day: data.day, time })}
              >
                {time}
              </p>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChackPoint({ selectedDay, setSelectedDay }) {
  return (
    <motion.div
      initial={{ opacity: 0, pointerEvents: "none" }}
      animate={{ opacity: 1, pointerEvents: "auto" }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.5 }}
      className="absolute top-[44px] bottom-0 right-0 w-full bg-white/80 backdrop-blur-[4px] flex flex-col justify-between"
    >
      <div className="w-full h-full flex flex-col justify-center gap-[40px]">
        <p className="font-bold text-[20px] tracking-[0.2em] self-center">
          סיכום התור
        </p>
        <div className="w-full flex justify-between divide-x-2 divide-peachRed items-center divide-x-reverse">
          <div className="w-full flex flex-col items-center gap-[10px]">
            <p>{format(selectedDay.day, "EEEE")}</p>
            <p>{format(selectedDay.day, "dd/MM/yyyy")}</p>
            <p>{selectedDay.time}</p>
          </div>
          <div className="w-full flex flex-col items-center gap-[10px]">
            <p>סוג התור</p>
            <p className="px-[15px] py-[5px] bg-peachRed rounded-[5px] text-white">
              תספורת
            </p>
          </div>
        </div>
      </div>
      <div className="self-end flex gap-[30px] items-center">
        <p onClick={() => setSelectedDay(null)} className="text-peachRed">
          ביטול
        </p>
        <p className="text-white bg-brownBlack rounded-[5px] px-[10px] py-[5px]">
          שמירה
        </p>
      </div>
    </motion.div>
  );
}

export default Appointment;
