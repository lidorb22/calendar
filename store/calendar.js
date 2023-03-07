import { startOfToday, setDefaultOptions } from "date-fns";
import { he } from "date-fns/locale";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
setDefaultOptions({ locale: he });
let today = startOfToday();

const calendarStore = create(
  devtools((set) => ({
    daysOBJ: [
      {
        day: today,
        start: "00:00",
        end: "11:50",
        pass: [],
      },
    ],
    isChangingDays: false,
    isNavOpen: false,
    navBoolState: () => {
      set((state) => ({ isNavOpen: !state.isNavOpen }));
    },
    turnChanging: (bool) => {
      set({ isChangingDays: bool });
    },
    setDays: (arr) => {
      set(
        produce((draft) => {
          arr.forEach((item, i) => {
            if (i === 0) draft.daysOBJ = [];
            draft.daysOBJ.push({
              day: item,
              start: "00:00",
              end: "11:50",
              pass: [],
            });
          });
        })
      );
    },
    changeInput: (name, value, index, passIndex, passName) => {
      if (name === "pass") {
        set(
          produce((draft) => {
            draft.daysOBJ[index][name][passIndex][passName] = value;
          })
        );
      } else {
        set(
          produce((draft) => {
            draft.daysOBJ[index][name] = value;
          })
        );
      }
    },
    addPass: (index) => {
      const passOption = {
        start: "00:00",
        end: "00:00",
      };
      set(
        produce((draft) => {
          draft.daysOBJ[index].pass.push(passOption);
        })
      );
    },
    removePass: (index, selectedIndex) => {
      set(
        produce((draft) => {
          draft.daysOBJ[selectedIndex].pass.splice(index, 1);
        })
      );
    },
    applyToAll: (index) => {
      set(
        produce((draft) => {
          draft.daysOBJ.forEach((item, i) => {
            if (index === i) return;
            draft.daysOBJ[i].start = draft.daysOBJ[index].start;
            draft.daysOBJ[i].end = draft.daysOBJ[index].end;
            draft.daysOBJ[i].pass = draft.daysOBJ[index].pass;
            return;
          });
        })
      );
    },
  }))
);
export default calendarStore;
