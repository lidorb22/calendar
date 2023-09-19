import axios from "axios";
import { useEffect, useState } from "react";
import appStore from "../../store/store";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function useGetStoreById(id) {
  const [store, setStore] = useState(null);
  const { user } = appStore((state) => state);
  useEffect(() => {
    async function api() {
      try {
        console.log("in try");
        const result = await axios.get(`${baseUrl}/store/`, {
          params: { id },
        });
        setStore(result.data);
      } catch (error) {
        console.log("in catch");
      }
    }
    return () => {
      api();
    };
  }, [user]);
  return { store };
}
