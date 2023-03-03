import {
  startOfToday,
  format,
  setDefaultOptions,
  eachDayOfInterval,
} from "date-fns";
import { he } from "date-fns/locale";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
setDefaultOptions({ locale: he });
let today = startOfToday();

const calendarStore = create(
  devtools((set) => ({
    days: [today, today],
    daysOBJ: [
      {
        day: format(today, "dd/MM/yy"),
        start: "00:00",
        end: "11:50",
        pass: [],
      },
    ],
    setDays: (firstDay, lastDay) => {
      set({ days: [firstDay, lastDay], daysOBJ: [] });
      let daysArray = eachDayOfInterval({
        start: firstDay,
        end: lastDay,
      });
      daysArray.forEach((dayInList, i) => {
        if (i === 0) {
          set({
            daysOBJ: [
              {
                day: format(dayInList, "dd/MM/yy"),
                start: "00:00",
                end: "11:50",
                pass: [],
              },
            ],
          });
          return;
        }
        set((state) => ({
          daysOBJ: [
            ...state.daysOBJ,
            {
              day: format(dayInList, "dd/MM/yy"),
              start: "00:00",
              end: "11:50",
              pass: [],
            },
          ],
        }));
      });
    },
    changeInput: (name, value, index, passIndex) => {
      if (name === "pass") {
        set((state) => (state.daysOBJ[index].pass[passIndex] = value));
      } else if (name === "start") {
        set((state) => ({
          //prettier-ignore
          daysOBJ: [state.daysOBJ[index], state.daysOBJ[index].start = value],
        }));
      }
    },
  }))
);
export default calendarStore;
