import { useEffect } from "react";
import AppointmentComp from "../components/appointmentComp";
import BusinessCalander from "../components/businessCalander";
import calendarStore from "../store/calendar";
import { useRouter } from "next/router";

export default function Home() {
  const { user } = calendarStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    if (user === null || user?.contractType === "normal") {
      router.push("/business");
    }
  }, [user, router]);

  return <BusinessCalander />;
}
