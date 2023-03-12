import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AppointmentComp from "../components/appointmentComp";
import calendarStore from "../store/calendar";

function Appointment() {
  const { user } = calendarStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/business");
    }
  }, [user, router]);
  return <AppointmentComp />;
}

export default Appointment;
