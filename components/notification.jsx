import * as Dialog from "@radix-ui/react-dialog";
import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

export default function Notification({
  trigger,
  massage,
  action,
  func,
  onOpenChange,
}) {
  return (
    <div>
      <Dialog.Root open={trigger} onOpenChange={onOpenChange}>
        {action === "error" ? (
          <Error massage={massage} />
        ) : action === "alert" ? (
          <Alert massage={massage} func={func} />
        ) : (
          <Notify massage={massage} />
        )}
      </Dialog.Root>
    </div>
  );
}

function Notify({ massage }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 backdrop-blur-[1px]" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-[20px] py-[30px] bg-white/95 rounded-[5px] shadow-[0px_4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col gap-[20px] w-max">
        <CheckBadgeIcon className="h-[50px] text-ten" />
        <p className="text-white font-bold bg-thirty rounded-[5px] px-[15px] py-[2px]">
          {massage}
        </p>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
function Alert({ massage, func }) {
  return (
    <Dialog.Portal>
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-[20px] py-[30px] bg-thirty/95 rounded-[5px] shadow-[0px_4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col gap-[10px] w-max backdrop-blur-[2px] text-white dir">
        <ExclamationTriangleIcon className="h-[60px] text-danger" />
        <Dialog.Description>{massage}</Dialog.Description>
        <button
          onClick={func}
          className="flex gap-[5px] items-center bg-danger w-max px-[5px] py-[4px] rounded-[5px] self-center"
        >
          <TrashIcon className="h-[20px] pointer-events-none" />
          <p className="pointer-events-none">מחיקה</p>
        </button>
        <Dialog.Close className="w-max self-center">ביטול</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
function Error({ massage }) {
  return (
    <Dialog.Portal>
      <Dialog.Content className="fixed top-1/2 left-[20px] -translate-y-1/2 px-[20px] py-[30px] bg-thirty/95 rounded-[5px] shadow-[0px_4px_4px_5px_rgba(0,0,0,0.25)] flex flex-col gap-[10px] w-[260px] backdrop-blur-[2px]">
        <ExclamationTriangleIcon className="h-[60px] text-danger" />
        <p className="text-white text-center">{massage}</p>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
