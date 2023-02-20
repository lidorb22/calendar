import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import CalendarEdit from "./edit";
import Calender from "./calender";
import useMeasure from "react-use-measure";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MainCalender() {
  const [ref, { height }] = useMeasure();
  const [editState, setEditState] = useState(false);
  return (
    <MotionConfig transition={{ duration: 1 }}>
      <motion.div animate={{ height }} className="w-full overflow-hidden">
        <div ref={ref} className="w-full">
          {editState && <CalendarEdit setEditState={setEditState} />}
          {!editState && <Calender setEditState={setEditState} />}
        </div>
      </motion.div>
    </MotionConfig>
  );
}

export default MainCalender;
