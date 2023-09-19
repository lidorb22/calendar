import { useEffect } from "react";
import Router from "next/router";
import appStore from "./store";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function useUser({
  redirectTo = "",
  owner = false,
  usage = "personal",
} = {}) {
  const { user } = appStore((state) => state);
  useEffect(() => {
    if (
      (redirectTo && !user) ||
      (redirectTo &&
        owner &&
        user &&
        Router.query?.storeid &&
        !user.ownedstores.some(
          (object) => object._id === Router.query.storeid
        )) ||
      (redirectTo && usage === "business" && user.usage === "personal")
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo]);

  return { user };
}
