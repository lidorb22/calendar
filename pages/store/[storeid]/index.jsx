import { useUser } from "../../../store/commonFunctions";
import {
  DayRuler,
  CreateDiaryElement,
  Form,
  ShowDiary,
} from "../../../components/store";
import { useEffect, useState } from "react";
import {
  closestIndexTo,
  isEqual,
  isSameWeek,
  parse,
  parseISO,
  setDefaultOptions,
  startOfToday,
  endOfDay,
  format,
  isSameDay,
  startOfDay,
} from "date-fns";
import { he } from "date-fns/locale";
import { AnimatePresence } from "framer-motion";
import { useGetStoreById } from "../../api/storeAPI";
import { useRouter } from "next/router";
setDefaultOptions({ locale: he });

export default function Page() {
  const router = useRouter();
  const { user } = useUser({ redirectTo: "/", owner: true });
  const { store } = useGetStoreById(router.query.storeid);
  console.log(store);
  const today = startOfToday(new Date());
  const [isCreatingNewDiary, setIsCreatingNewDiary] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [dayTracker, setDayTracker] = useState(endOfDay(today));
  const [daysWithDiary, setDaysWithDiary] = useState([]);
  useEffect(() => {
    if (store?.diary.length > 0) {
      const arr = [];
      store?.diary.forEach((element) => {
        element.workingdays.forEach((day) =>
          arr.push(parse(day, "dd/MM/yyyy", new Date()))
        );
      });
      setDaysWithDiary(arr);
      if (currentSection > 0) setCurrentSection(0);
    } else if (daysWithDiary.length === 1 && store?.diary.length === 0) {
      setDaysWithDiary([]);
    }
  }, [store]);
  return (
    <div className="w-full h-max px-[20px] text-[14px] flex flex-col gap-[10px] pb-[20px] pt-[60px]">
      <DayRuler
        daysWithDiary={daysWithDiary}
        dayTracker={dayTracker}
        setDayTracker={setDayTracker}
        isCreatingNewDiary={isCreatingNewDiary}
        setIsCreatingNewDiary={setIsCreatingNewDiary}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <AnimatePresence initial={false}>
        {isCreatingNewDiary &&
        !isSameDay(
          dayTracker,
          daysWithDiary[closestIndexTo(dayTracker, daysWithDiary)]
        ) ? (
          <Form
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            setIsCreatingNewDiary={setIsCreatingNewDiary}
          />
        ) : isSameDay(
            dayTracker,
            daysWithDiary[closestIndexTo(startOfDay(dayTracker), daysWithDiary)]
          ) ? (
          <ShowDiary
            store={
              store?.diary[
                store?.diary.findIndex((item) =>
                  isSameWeek(dayTracker, parseISO(item.firstdayatweek))
                )
              ]
            }
            dayTracker={dayTracker}
            owner={user?._id}
          />
        ) : (
          <CreateDiaryElement
            dayTracker={dayTracker}
            setIsCreatingNewDiary={setIsCreatingNewDiary}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
