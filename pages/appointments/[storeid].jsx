import { Schedule, Verify } from "../../components/appointments";
import { useUser } from "../../store/commonFunctions";
import { getStoreById } from "../api/storeAPI";
import { useRouter } from "next/router";
import {
  closestIndexTo,
  format,
  isFuture,
  isThisMonth,
  isThisWeek,
  parseISO,
  setDefaultOptions,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useEffect, useState } from "react";
import { he } from "date-fns/locale";
setDefaultOptions({ locale: he });
import { AnimatePresence } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const { user } = useUser({ redirectTo: "/" });
  const { store } = getStoreById(router.query.storeid);
  const today = startOfToday(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDiaryIndex, setSelectedDiaryIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    if (store !== null && selectedWeek === null) {
      isEmpty && setIsEmpty(false);
      const arrOfDays = [];
      store?.diary.forEach((day) =>
        arrOfDays.push(parseISO(day.firstdayatweek))
      );
      const diaryIndexInThisWeek = closestIndexTo(
        startOfWeek(today),
        arrOfDays
      );
      if (
        isThisWeek(parseISO(store?.diary[diaryIndexInThisWeek]?.firstdayatweek))
      ) {
        setSelectedWeek(
          parseISO(store?.diary[diaryIndexInThisWeek]?.firstdayatweek)
        );
      } else if (
        isFuture(parseISO(store?.diary[diaryIndexInThisWeek]?.firstdayatweek))
      ) {
        setSelectedWeek(
          parseISO(store?.diary[diaryIndexInThisWeek]?.firstdayatweek)
        );
      } else {
        setSelectedWeek(null);
        setIsEmpty(true);
      }
      setSelectedDiaryIndex(diaryIndexInThisWeek);
    }
  }, [store]);
  return (
    <div className="w-full h-full px-[20px] pt-[60px] flex flex-col pb-[20px] gap-[20px] overflow-hidden">
      <div className="w-full flex flex-col gap-[10px]">
        <p className="self-center">{store?.name}</p>
        {selectedWeek !== null && (
          <div className="flex items-center bg-ten w-max rounded-[5px] text-white px-[15px] self-center gap-[5px]">
            {isThisWeek(selectedWeek) ? (
              <p>השבוע</p>
            ) : isThisMonth(selectedWeek) ? (
              <p>החודש</p>
            ) : (
              <p>{format(selectedWeek, "MMMM (MM)")}</p>
            )}
          </div>
        )}
      </div>
      <div className="w-full h-full overflow-hidden relative">
        <AnimatePresence initial={false}>
          {store !== null && selectedDay === null && selectedWeek !== null ? (
            <Schedule
              key="Schedule"
              store={store?.diary[selectedDiaryIndex]}
              selectedDiaryIndex={selectedDiaryIndex}
              setSelectedDay={setSelectedDay}
            />
          ) : (
            store !== null &&
            selectedDay !== null && (
              <Verify
                key={selectedDay}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                user={user}
                storeid={router.query.storeid}
              />
            )
          )}
        </AnimatePresence>
        {isEmpty && (
          <div className="w-full h-full flex items-center justify-center">
            <p className="w-max bg-ten font-bold text-white rounded-[5px] px-[15px] py-[2px]">
              נראה כי נגמרו התורים
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
