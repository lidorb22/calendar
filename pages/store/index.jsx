import { useUser } from "../../store/commonFunctions";
import { Form, Input } from "../../components/htmlblock";
import { StoreTab } from "../../components/appointments";
import {
  InformationCircleIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
//import appStore from "../../store/store";
export default function Page() {
  const { user } = useUser({ redirectTo: "/", usage: "business" });
  //const { addStore } = appStore((state) => state);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  function submit() {
    if (name === "" || address === "") return;
    //addStore(name, address);
  }
  return (
    <div className="w-full px-[20px] pt-[60px] flex flex-col gap-[40px]">
      <h1 className="font-bold">יצירת יומן חדש</h1>
      <Form butTitle="יצירת יומן" onSubmit={submit}>
        <Input
          placeholder="שם העסק שלך, הלקוחות שלך יראו אותו."
          type="text"
          title="שם העסק"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <UserIcon className="h-[20px]" />
        </Input>
        <Input
          placeholder="כתובת העסק שלך, שהלקוחות ידעו לאן להגיע."
          type="text"
          title="כתובת"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        >
          <MapPinIcon className="h-[20px]" />
        </Input>
        <Input
          placeholder="מידע שהלקוחות החדשים שלך יראו בזמן שהם נכנסים לקבוע תור חדש. (אופציונאלי)"
          type="textArea"
          title="מידע נוסף ללקוחות"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
          <InformationCircleIcon className="h-[20px]" />
        </Input>
      </Form>
      <div className="w-full flex flex-col gap-[10px]">
        <p>תצוגה מקדימה</p>
        <StoreTab name={name} details={address} />
      </div>
    </div>
  );
}
