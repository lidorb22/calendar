import {
  AtSymbolIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  PhoneIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { Form, Input, VerifyInput } from "./htmlblock";
import appStore from "../store/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Notification from "./notification";
import { useRouter } from "next/router";

export function NavClosed() {
  const { navBoolState } = appStore((state) => state);
  const router = useRouter();
  return (
    <div className="absolute h-full w-full top-0 right-0 left-0 bottom-0 flex flex-row-reverse justify-between pointer-events-none">
      <div className="p-[20px] justify-self-end">
        <EllipsisVerticalIcon
          className="h-[20px] pointer-events-auto"
          onClick={() => navBoolState()}
        />
      </div>
      {router.route === "/appointments/[storeid]" && (
        <div className="p-[20px]">
          <ChevronLeftIcon
            onClick={() => router.push("/appointments")}
            className="h-[20px] pointer-events-auto text-ten"
          />
        </div>
      )}
    </div>
  );
}

export function NavOpen() {
  const { navBoolState, user } = appStore((state) => state);
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 right-0 left-0 bottom-0 h-full w-[300px] flex dir pl-[20px] pr-[10px] justify-between items-center gap-[20px] text-thirty"
    >
      <div className="w-[2px] h-5/6 bg-ten"></div>
      <div className="flex flex-col gap-[40px] w-full h-full">
        <div className="self-end pt-[20px]">
          <XMarkIcon className="h-[20px]" onClick={() => navBoolState()} />
        </div>
        <AnimatePresence>{user ? <Main /> : <Connection />}</AnimatePresence>
      </div>
    </motion.div>
  );
}

function Connection() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [open, setOpen] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  useEffect(() => {
    let timer;
    if (errorMassage.length > 0) {
      setOpen(true);
      timer = setTimeout(() => {
        setOpen(false);
        setErrorMassage("");
      }, 3000);
    }

    return () => {
      if (errorMassage.length > 0) {
        clearTimeout(timer);
      }
    };
  }, [errorMassage]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-[40px]"
    >
      <Notification trigger={open} massage={errorMassage} action="error" />
      <div className="flex items-center justify-center gap-[5px]">
        <p
          className={isSignedIn ? "text-ten cursor-default" : "cursor-pointer"}
          onClick={() => setIsSignedIn(true)}
        >
          כניסה
        </p>
        <p>/</p>
        <p
          className={isSignedIn ? "cursor-pointer" : "text-ten cursor-default"}
          onClick={() => setIsSignedIn(false)}
        >
          הרשמה
        </p>
      </div>
      {isSignedIn ? (
        <LoginForm setErrorMassage={setErrorMassage} />
      ) : (
        <RegisterForm setErrorMassage={setErrorMassage} />
      )}
    </motion.div>
  );
}

function LoginForm({ setErrorMassage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = appStore((state) => state);
  async function submit() {
    if (name === "" || email === "")
      return setErrorMassage("אחד או יותר משדות המילויי רקות");
    setLoading(true);
    const { state } = await loginUser({ name, email });
    if (!state) {
      return setErrorMassage("טעות בהקלדה או שהמשתמש אינו קיים");
    }
  }
  return (
    <Form butTitle="כניסה" onSubmit={submit} method="post">
      <Input
        title="שם מלא"
        placeholder="השם המלא שלך"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <UserIcon className="h-[20px]" />
      </Input>
      <Input
        title="אימייל"
        placeholder="כתובת האימייל שלך"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        <AtSymbolIcon className="h-[20px]" />
      </Input>
    </Form>
  );
}

function RegisterForm({ setErrorMassage }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //const { registerUser } = appStore((state) => state);
  function submit() {
    return setErrorMassage("זמנית לא ניתן להירשם");
    /*if (firstName === "" || email === "" || phone === "" || lastName === "")
      return setErrorMassage("יש לוודא כי כל שדות המילויי מלאות");
    registerUser({ firstName, email, lastName, phone }, setErrorMassage);*/
  }
  return (
    <Form butTitle="הרשמה" onSubmit={submit} method="post">
      <Input
        title="שם פרטי"
        placeholder="השם פרטי שלך"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      >
        <UserIcon className="h-[20px]" />
      </Input>
      <Input
        title="שם משפחה"
        placeholder="שם המשפחה שלך"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      >
        <UserGroupIcon className="h-[20px]" />
      </Input>
      <Input
        title="אימייל"
        placeholder="כתובת האימייל שלך"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        <AtSymbolIcon className="h-[20px]" />
      </Input>
      <Input
        title="טלפון"
        placeholder="מספר הטלפון שלך"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      >
        <PhoneIcon className="h-[20px]" />
      </Input>
    </Form>
  );
}

function Verify() {
  const [firstName, setFirstName] = useState("");
  return (
    <Form butTitle="אימות">
      <VerifyInput bold="לכתובת האימייל" />
    </Form>
  );
}

function Main() {
  const { logOutUser, user, navBoolState, storeIndexSelection } = appStore(
    (state) => state
  );
  const [selectStore, setSelectStore] = useState(false);
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col gap-[40px]"
    >
      <div className="flex flex-col">
        <p>שלום {user?.name}</p>
        {user?.usage === "business" && user?.ownedstores.length > 0 && (
          <>
            <div
              onClick={() => setSelectStore(!selectStore)}
              className="text-ten flex gap-[10px] w-max cursor-pointer"
            >
              <CalendarDaysIcon className="h-[20px]" />
              <p className="text-[14px]">
                {user?.ownedstores[user?.selectedStoreIndex]?.name}
              </p>
            </div>
            <AnimatePresence>
              {selectStore && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-max flex flex-col overflow-hidden"
                >
                  {user?.ownedstores.map(
                    (store, index) =>
                      index !== user.selectedStoreIndex && (
                        <div
                          key={store._id}
                          onClick={() => {
                            storeIndexSelection(index);
                            setSelectStore(false);
                          }}
                          className="flex gap-[10px] mt-[5px] cursor-pointer"
                        >
                          <CalendarDaysIcon className="h-[20px] pointer-events-none" />
                          <p className="text-[14px] pointer-events-none">
                            {store.name}
                          </p>
                        </div>
                      )
                  )}
                  <div
                    onClick={() => {
                      router.push("/store");
                      navBoolState();
                    }}
                    className="flex gap-[10px] mt-[5px] cursor-pointer"
                  >
                    <PlusIcon className="h-[20px] pointer-events-none" />
                    <p className="text-[14px] pointer-events-none">
                      הוספת יומן חדש
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        {user?.usage === "business" && user?.ownedstores.length === 0 && (
          <>
            <div
              onClick={() => {
                router.push("/store");
                navBoolState();
              }}
              className="flex text-ten gap-[10px] mt-[5px] cursor-pointer"
            >
              <PlusIcon className="h-[20px] pointer-events-none" />
              <p className="text-[14px] pointer-events-none">יצירת היומן שלך</p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-[10px] w-full">
        {user?.usage === "business" && user.ownedstores.length > 0 && (
          <Link
            onClick={() => navBoolState()}
            href={`/store/${user?.ownedstores[user?.selectedStoreIndex]?._id}`}
          >
            יומן
          </Link>
        )}
        <Link onClick={() => navBoolState()} href="/appointments">
          קביעת תור
        </Link>
        {user?.usage === "business" && user.ownedstores.length > 0 && (
          <Link
            onClick={() => navBoolState()}
            href={`/store/${
              user?.ownedstores[user?.selectedStoreIndex]?._id
            }/actions`}
          >
            פעולות
          </Link>
        )}
        <Link onClick={() => navBoolState()} href="/settings">
          הגדרות
        </Link>
        {user?.usage !== "business" && (
          <div className="w-full relative bg-ten rounded-[5px] p-[10px] text-white pb-[20px] flex flex-col">
            <div className="flex items-center">
              <ChevronLeftIcon className="h-[20px]" />
              <p className="font-bold">עיסקי</p>
            </div>
            <p className="text-center text-[14px]">
              בעל עסק? מתעסק עם תורים? {<br></br>} אל תשבור את הראש! {<br></br>}{" "}
              הצטרף אלינו ותחסוך זמן
            </p>
            <p className="px-[5px] py-[2px] bg-white text-thirty border-b-ten border-b-[2px] absolute -bottom-[10px] rounded-t-[5px] left-[10px] text-[12px]">
              25 / חודש
            </p>
          </div>
        )}
        <p className="cursor-pointer" onClick={() => logOutUser()}>
          יציאה
        </p>
      </div>
    </motion.div>
  );
}
