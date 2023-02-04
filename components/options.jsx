import { PlusIcon, PencilSquareIcon } from "@heroicons/react/20/solid";

function Options() {
  return (
    <div className="flex flex-col w-full py-[20px] gap-y-[20px]">
      <div className="flex dir items-center justify-between w-full">
        <p className="">סוגי תורים</p>
        <div className="flex gap-[20px]">
          <PencilSquareIcon className="w-[20px]" />
          <PlusIcon className="w-[20px]" />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-y-[10px] justify-items-center dir">
        <Option />
        <Option />
        <Option />
      </div>
    </div>
  );
}

function Option() {
  return (
    <div className="flex w-[100px] h-[100px] border-brownBlack rounded-[5px] border-[2px] items-center justify-center">
      <p className="text-center">תספורת 20 דקות</p>
    </div>
  );
}

export default Options;
