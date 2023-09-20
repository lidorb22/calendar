import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export function useGetStoreById(id) {
  const [store, setStore] = useState(null);
  useEffect(() => {
    async function api() {
      try {
        const result = await axios.get(`${baseUrl}/store/`, {
          params: { id },
        });
        setStore(result.data);
      } catch (error) {}
    }
    api();
    return () => {};
  }, []);
  return { store };
}
