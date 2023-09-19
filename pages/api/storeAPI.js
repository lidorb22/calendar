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
        const result = await axios.get(`${baseUrl}/store/`, {
          params: { id },
        });
        setStore(result.data);
      } catch (error) {}
    }
    return () => {
      api();
      console.log("runing");
    };
  }, [user]);
  return { store };
}
