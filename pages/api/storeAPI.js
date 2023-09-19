import axios from "axios";
import { useEffect, useState } from "react";
import appStore from "../../store/store";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function getStoreById(id) {
  const [store, setStore] = useState(null);
  const { user } = appStore((state) => state);
  useEffect(() => {
    async function api() {
      try {
        const result = await axios.get(`${baseUrl}/store/`, {
          params: { id },
        });
        setStore(result.data);
      } catch (error) {}
    }
    return () => {
      api();
    };
  }, [user]);
  return { store };
}

export function getAppointmentsById() {
  const [appointments, setAppointments] = useState(null);
  const { user } = appStore((state) => state);
  useEffect(() => {
    async function api() {
      try {
        const result = await axios.get(`${baseUrl}/appointment/`, {
          params: { userid: user._id },
        });
        setAppointments(result.data);
      } catch (error) {}
    }
    return () => {
      api();
    };
  }, [user]);
  return { appointments };
}
