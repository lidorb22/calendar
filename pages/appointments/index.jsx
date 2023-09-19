import { PlusIcon } from "@heroicons/react/20/solid";
import { AppointmentsInbox, StoreTab } from "../../components/appointments";
import { useUser } from "../../store/commonFunctions";
import appStore from "../../store/store";
export default function Page() {
  const { user } = useUser({ redirectTo: "/" });
  const { connectStore } = appStore((state) => state);
  return (
    <div className="w-full h-full px-[20px] pt-[20px] flex flex-col pb-[20px] gap-[40px] overflow-hidden">
      <div
        onClick={() =>
          user?.linkedstores.length === 0 &&
          connectStore("64f060ecf94fac99683bda6e")
        }
        className="flex items-center text-ten w-max"
      >
        <PlusIcon className="h-[20px] pointer-events-none" />
        <p className="pointer-events-none">הוספת עסק</p>
      </div>
      <div className="w-full h-full flex flex-col gap-[20px] overflow-y-auto pb-[10px]">
        {user?.linkedstores.map((store) => (
          <StoreTab
            key={store._id}
            storeID={store._id}
            name={store.name}
            details={store.address}
            type="store"
          />
        ))}
      </div>
      <AppointmentsInbox />
    </div>
  );
}
