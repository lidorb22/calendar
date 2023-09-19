import { create } from "zustand";
import { devtools } from "zustand/middleware";
import produce from "immer";
import { endOfDay, format, set as settingDates, startOfDay } from "date-fns";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const appStore = create(
  devtools((set, get) => ({
    daysOBJ: [],
    isNavOpen: false,
    user: null,
    loginUser: async (payload) => {
      let state = null;
      await axios
        .post(`${baseUrl}/user/login`, {
          name: payload.name,
          email: payload.email,
        })
        .then((result) => {
          set(
            produce((draft) => {
              if (result.data.usage === "business") {
                draft.user = { ...result.data, selectedStoreIndex: 0 };
              } else {
                draft.user = result.data;
              }
            })
          );
        })
        .catch((err) => {
          state = false;
        });
      return { state };
    },
    registerUser: async (payload, setErrorMassage) => {
      await axios
        .post(`${baseUrl}/user/register`, {
          name: payload.firstName + " " + payload.lastName,
          email: payload.email,
          phone: payload.phone,
        })
        .then((result) => {
          set(
            produce((draft) => {
              draft.user = result.data;
            })
          );
        })
        .catch((err) => setErrorMassage(err.response.data));
    },
    storeIndexSelection: (index) => {
      set(
        produce((draft) => {
          draft.user.selectedStoreIndex = index;
        })
      );
    },
    addStore: async (name, address) => {
      await axios
        .post(`${baseUrl}/store/`, {
          name,
          address,
          owner: get().user._id,
        })
        .then((result) => {
          set(
            produce((draft) => {
              draft.user.ownedstores.push(result.data);
            })
          );
        })
        .catch((err) => console.log(err));
    },
    updateUser: (obj) => {
      set(
        produce((draft) => {
          if (obj.phone !== undefined) draft.user.phone = obj.phone;
        })
      );
    },
    disconnectStore: async (storeid) => {
      try {
        const result = await axios.patch(`${baseUrl}/store/`, {
          clientid: get().user._id,
          storeid,
        });
        console.log(result.data);
        set(
          produce((draft) => {
            draft.user.linkedstores = draft.user.linkedstores.filter(
              (item) => item._id !== storeid
            );
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    connectStore: async (storeid) => {
      try {
        const result = await axios.patch(`${baseUrl}/store/`, {
          clientid: get().user._id,
          storeid,
        });
        set(
          produce((draft) => {
            draft.user.linkedstores.push({
              _id: result.data.store._id,
              name: result.data.store.name,
              diary: result.data.store.diary,
              address: result.data.store.address,
            });
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    logOutUser: () => {
      set({
        user: null,
      });
    },
    navBoolState: () => {
      set((state) => ({ isNavOpen: !state.isNavOpen }));
    },
    startNewDraft: (day) => {
      set(
        produce((draft) => {
          draft.daysOBJ.push({
            day,
            start: settingDates(day, {
              hours: draft.user.ownedstores[0].options.start.split(":")[0],
              minutes: draft.user.ownedstores[0].options.start.split(":")[1],
            }),
            end: settingDates(day, {
              hours: draft.user.ownedstores[0].options.end.split(":")[0],
              minutes: draft.user.ownedstores[0].options.end.split(":")[1],
            }),
            breaks: [],
          });
        })
      );
    },
    setDraft: (name, value) => {
      set(
        produce((draft) => {
          name.forEach((info, i) => {
            if (info === "breaks") {
              const breaksArr = [];
              value[i].forEach((br) => {
                const arr = [];
                br.forEach((time) => {
                  arr.push(
                    settingDates(draft.daysOBJ[0].day, {
                      hours: time.split(":")[0],
                      minutes: time.split(":")[1],
                    })
                  );
                });
                breaksArr.push(arr);
              });
              draft.daysOBJ[0].breaks = breaksArr;
              return;
            }
            draft.daysOBJ[0][info] = settingDates(draft.daysOBJ[0].day, {
              hours: value[i].split(":")[0],
              minutes: value[i].split(":")[1],
            });
          });
        })
      );
    },
    sameOptionsDraft: (day) => {
      set(
        produce((draft) => {
          let openStoreFormat = format(draft.daysOBJ[0].start, "HH:mm");
          let closeStoreFormat = format(draft.daysOBJ[0].end, "HH:mm");
          let breaks = [];
          if (draft.daysOBJ[0].breaks.length !== 0) {
            for (let br of draft.daysOBJ[0].breaks) {
              let startBreakFormat = format(br[0], "HH:mm");
              let finishBreakFormat = format(br[1], "HH:mm");
              let first = settingDates(day, {
                hours: startBreakFormat.split(":")[0],
                minutes: startBreakFormat.split(":")[1],
              });
              let second = settingDates(day, {
                hours: finishBreakFormat.split(":")[0],
                minutes: finishBreakFormat.split(":")[1],
              });
              breaks.push([first, second]);
            }
          }
          draft.daysOBJ.push({
            day,
            start: settingDates(day, {
              hours: openStoreFormat.split(":")[0],
              minutes: openStoreFormat.split(":")[1],
            }),
            end: settingDates(day, {
              hours: closeStoreFormat.split(":")[0],
              minutes: closeStoreFormat.split(":")[1],
            }),
            breaks,
          });
        })
      );
    },
    updateOwnDiary: async () => {
      try {
        const result = await axios.post(`${baseUrl}/diary/`, {
          storeid: get().user?.ownedstores[get().user?.selectedStoreIndex]?._id,
          daysOBJ: get().daysOBJ,
        });
        set(
          produce((draft) => {
            draft.user.ownedstores[draft.user.selectedStoreIndex].diary =
              result.data;
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    resetDraft: () => {
      set(
        produce((draft) => {
          draft.daysOBJ = [draft.daysOBJ[0]];
        })
      );
    },
    removeDayFromDraft: (index) => {
      set(
        produce((draft) => {
          draft.daysOBJ.splice(index, 1);
        })
      );
    },
    clearDraft: () => {
      set(
        produce((draft) => {
          draft.daysOBJ = [];
        })
      );
    },
    deleteDraft: async (day, diaryid) => {
      try {
        const result = await axios.delete(`${baseUrl}/diary/`, {
          data: {
            id: diaryid,
            ownerid: get().user._id,
            day,
          },
        });
        set(
          produce((draft) => {
            draft.user.ownedstores[draft.user.selectedStoreIndex].diary =
              result.data;
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    appointmentHandler: async (storeid, date, turn, userid) => {
      let state = "failed";
      try {
        const result = await axios.patch(`${baseUrl}/appointment/`, {
          storeid,
          date,
          turn,
          userid,
        });
        set(
          produce((draft) => {
            if (result.data.action === "delete") {
              draft.user.appointments = draft.user.appointments.filter(
                (item) => item._id !== result.data.appointment._id
              );
            } else {
              draft.user.appointments.push(result.data.appointment);
            }
          })
        );
        state = result.data.action;
      } catch (error) {
        console.log(error);
      }
      return { state };
    },
  }))
);
export default appStore;
