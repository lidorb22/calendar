import calendarStore from "@/store/calendar";
import { ArrowLeftOnRectangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { classNames } from "../store/commonFunctions";
import Link from "next/link";

function Navbar() {
  const { navBoolState, user } = calendarStore((state) => state);
  const router = useRouter();
  /*useEffect(() => {
    navBoolState();
  }, [router]);*/

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.8 }}
      className="w-[300px] h-full px-[20px] pt-[20px] pb-[80px] left-0 top-0 absolute bg-white z-10 flex flex-col gap-[20px]"
    >
      <div className="w-full flex justify-end">
        <XMarkIcon
          onClick={() => navBoolState()}
          className="h-[20px] text-peachRed"
        />
      </div>
      {user !== null && <LogedIn />}
      {user === null && <LogedOut />}
    </motion.div>
  );
}

function LogedIn() {
  const { fullName, contractType } = calendarStore((state) => state.user);
  const { logOutUser } = calendarStore((state) => state);
  const router = useRouter();
  return (
    <div className="w-full h-full relative px-[20px] flex flex-col justify-between">
      <div className="w-[2px] h-full bg-peachRed absolute right-0 top-0"></div>
      <div className="w-full flex flex-col gap-[40px]">
        <p>שלום {fullName}</p>
        <div className="w-full flex flex-col gap-[15px]">
          <Link
            href={contractType === "business" ? "/" : "/appointment"}
            className={`${classNames(
              router.pathname === "/" &&
                contractType === "business" &&
                "text-peachRed",
              router.pathname === "/appointment" &&
                contractType === "normal" &&
                "text-peachRed"
            )}`}
          >
            ראשי
          </Link>
          {contractType === "business" && (
            <Link
              href="/appointment"
              className={`${classNames(
                router.pathname === "/appointment" && "text-peachRed"
              )}`}
            >
              קביעת תור
            </Link>
          )}
          {contractType === "business" && (
            <Link
              href="/actions"
              className={`${classNames(
                router.pathname === "/actions" && "text-peachRed"
              )}`}
            >
              פעולות
            </Link>
          )}
          <Link
            href="/business"
            className={`${classNames(
              router.pathname === "/business" && "text-peachRed"
            )}`}
          >
            עיסקי
          </Link>
          <Link
            href="/settings"
            className={`${classNames(
              router.pathname === "/settings" && "text-peachRed"
            )}`}
          >
            הגדרות
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-[10px] text-peachRed">
        <p
          onClick={() => {
            logOutUser();
          }}
          className="tracking-[0.2em]"
        >
          יציאה
        </p>
        <ArrowLeftOnRectangleIcon className="w-[20px]" />
      </div>
    </div>
  );
}

function LogedOut() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-full h-full relative px-[20px] flex flex-col items-center gap-[40px]">
      <div className="w-[2px] h-full bg-peachRed absolute right-0 top-0"></div>
      <p>
        <span
          onClick={() => setIsLogin(true)}
          className={classNames(isLogin && "text-peachRed")}
        >
          כניסה
        </span>{" "}
        /{" "}
        <span
          onClick={() => setIsLogin(false)}
          className={classNames(!isLogin && "text-peachRed")}
        >
          הרשמה
        </span>
      </p>
      {isLogin && <Login />}
      {!isLogin && <Register />}
    </div>
  );
}
function Login() {
  const { testUser } = calendarStore((state) => state);
  return (
    <form className="w-full flex flex-col gap-[20px] px-[20px]">
      <input
        type="text"
        placeholder="שם מלא"
        className="w-full h-[30px] px-[5px] text-white placeholder:text-white/50 bg-peachRed rounded-[5px]"
      />
      <input
        type="text"
        placeholder="מספר טלפון / אימייל"
        className="w-full h-[30px] px-[5px] text-white placeholder:text-white/50 bg-peachRed rounded-[5px]"
      />
      <p
        className="self-end text-peachRed"
        onClick={() => {
          testUser();
        }}
      >
        כניסה
      </p>
    </form>
  );
}
function Register() {
  return (
    <form className="w-full flex flex-col gap-[20px] px-[20px] text-white">
      <input
        type="text"
        placeholder="שם פרטי"
        className="w-full h-[30px] px-[5px] placeholder:text-white/50 bg-peachRed rounded-[5px]"
      />
      <input
        type="text"
        placeholder="שם משפחה"
        className="w-full h-[30px] px-[5px] placeholder:text-white/50 bg-peachRed rounded-[5px]"
      />
      <input
        type="email"
        placeholder="אימייל"
        className="w-full h-[30px] px-[5px] placeholder:text-white/50 bg-peachRed rounded-[5px]"
      />
      <div className="w-full h-[30px] flex gap-[10px]">
        <input
          type="tel"
          placeholder="מספר טלפון"
          className="w-full h-full px-[5px] placeholder:text-white/50 bg-peachRed rounded-[5px]"
        />
        <select
          className="w-[60px] h-[full] bg-peachRed rounded-[5px]"
          id="cars"
          name="cars"
        >
          <option value="050">050</option>
          <option value="052">052</option>
          <option value="054">054</option>
        </select>
      </div>
      <p className="self-end text-peachRed">הרשמה</p>
    </form>
  );
}

export default Navbar;
