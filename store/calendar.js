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
  devtools((set, get) => ({
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
      } else {
        const oldDO = get().daysOBJ;
        oldDO[index] = { ...oldDO[index], [name]: value };
        console.log(oldDO);
        set({ daysOBJ: oldDO });
      }
    },
    addPass: (index) => {
      const passOption = ["00:00", "00:00"];
      const oldDO = get().daysOBJ;
      oldDO[index].pass.push(passOption);
      set({ daysOBJ: oldDO });
    },
    removePass: (index, selectedIndex) => {
      const oldDO = get().daysOBJ;
      oldDO[selectedIndex].pass.splice(index, 1);
      set({ daysOBJ: oldDO });
    },
  }))
);
export default calendarStore;
