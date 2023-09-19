import {
  CheckIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Form(props) {
  const Children = props.children;
  function submitFuction(e) {
    e.preventDefault();
    props.onSubmit(e);
  }
  return (
    <form
      method={props.method}
      onSubmit={submitFuction}
      className="w-full flex flex-col gap-[20px]"
    >
      {Children}
      <button type="submit" className="text-ten self-end">
        {props.butTitle}
      </button>
    </form>
  );
}

export function Input(props) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="flex gap-[10px] text-ten">
        {props.children}
        <p className="text-thirty">{props.title}</p>
      </div>
      {props.type !== "textArea" ? (
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className="bg-thirty placeholder:text-white/50 rounded-[5px] w-full px-[10px] h-[30px] text-white"
        />
      ) : (
        <textarea
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          className="bg-thirty placeholder:text-white/50 rounded-[5px] w-full p-[10px] h-[140px] resize-none text-white"
        />
      )}
    </div>
  );
}

export function VerifyInput(props) {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <p>
        בזה הרגע קוד בן 5 ספרות נשלח{" "}
        <span className="bg-thirty text-white px-[2px]">{props.bold}</span> שלך,
        הכנס אותו בקומו.
      </p>
      <div className="w-full h-[30px] flex items-center justify-evenly">
        <input
          type="number"
          placeholder="0"
          maxLength={1}
          className="bg-thirty w-[30px] h-full rounded-[5px] text-ten placeholder:text-ten/30 text-center"
        />
        <input
          type="number"
          placeholder="0"
          maxLength={1}
          className="bg-thirty w-[30px] h-full rounded-[5px] text-ten placeholder:text-ten/30 text-center"
        />
        <input
          type="number"
          placeholder="0"
          maxLength={1}
          className="bg-thirty w-[30px] h-full rounded-[5px] text-ten placeholder:text-ten/30 text-center"
        />
        <input
          type="number"
          placeholder="0"
          maxLength={1}
          className="bg-thirty w-[30px] h-full rounded-[5px] text-ten placeholder:text-ten/30 text-center"
        />
        <input
          type="number"
          placeholder="0"
          maxLength={1}
          className="bg-thirty w-[30px] h-full rounded-[5px] text-ten placeholder:text-ten/30 text-center"
        />
      </div>
    </div>
  );
}

export function SettingsForm(props) {
  const [isChanging, setIsChanging] = useState(false);
  return (
    <form method="post" className="w-full flex flex-col gap-[10px]">
      <div className="flex w-full items-center justify-between">
        <p className="font-bold">{props.title}</p>
        {isChanging ? (
          <div className="flex w-max gap-[20px]">
            <XMarkIcon
              onClick={() => setIsChanging(false)}
              className="h-[20px]"
            />
            <CheckIcon className="h-[20px] text-ten" />
          </div>
        ) : (
          <PencilSquareIcon
            onClick={() => setIsChanging(true)}
            className="text-ten h-[20px]"
          />
        )}
      </div>
      <div className="w-full flex flex-col gap-[5px]">
        {props.inputs.map((info) => (
          <InputController
            key={info.type + info.name}
            inputType={info.type}
            isChanging={isChanging}
            value={info.value}
            name={info.name}
          />
        ))}
      </div>
    </form>
  );
}

function InputController(props) {
  return props.inputType === "static" ? (
    <RegularField
      isChanging={props.isChanging}
      value={props.value}
      name={props.name}
    />
  ) : props.inputType === "edit" ? (
    <RegularField
      isChanging={props.isChanging}
      editable={true}
      value={props.value}
      name={props.name}
    />
  ) : props.inputType === "drop" ? (
    <DropDownField
      isChanging={props.isChanging}
      value={props.value}
      name={props.name}
    />
  ) : (
    <TimeField
      isChanging={props.isChanging}
      value={props.value}
      name={props.name}
    />
  );
}
function RegularField(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="w-max flex items-center gap-[10px]">
      <p>{props.name + ":"}</p>
      {props.isChanging && props.editable ? (
        <input
          className="text-ten focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  );
}

function TimeField(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div className="w-max flex items-center gap-[10px]">
      <p>{props.name + ":"}</p>
      {props.isChanging ? (
        <input
          className="text-ten focus:outline-none"
          type="time"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  );
}

function DropDownField(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(
    props.value === "phone" ? "טלפון" : "אימייל"
  );
  return (
    <div className="w-full flex items-start gap-[10px]">
      <p>{props.name + ":"}</p>
      {props.isChanging ? (
        <div className="flex flex-col relative">
          <div className="flex gap-[5px] items-center">
            <p>{value}</p>
            <ChevronDownIcon
              onClick={() => setIsOpen(!isOpen)}
              className="text-ten h-[20px]"
            />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.8 }}
                className="border-ten border-2 rounded-[5px] px-[10px] flex flex-col absolute bg-white top-full self-center divide-y-2 divide-ten mt-[5px] overflow-hidden"
              >
                <p
                  onClick={(e) => {
                    setValue(e.target.innerHTML);
                    setIsOpen(false);
                  }}
                  className="py-[5px]"
                >
                  טלפון
                </p>
                <p
                  onClick={(e) => {
                    setValue(e.target.innerHTML);
                    setIsOpen(false);
                  }}
                  className="py-[5px]"
                >
                  אימייל
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <p>{props.value === "phone" ? "טלפון" : "אימייל"}</p>
      )}
    </div>
  );
}
