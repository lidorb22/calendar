import "@/styles/globals.css";
import { NavClosed, NavOpen } from "../components/nav-bar";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import appStore from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
  const { isNavOpen } = appStore((state) => state);
  return (
    <>
      <motion.div
        animate={isNavOpen ? { x: 300 } : { x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full flex flex-col fixed dir font-rubik text-thirty overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 bottom- right-0 left-0 h-full w-full bg-thirty/90 z-10"
            ></motion.div>
          )}
        </AnimatePresence>
        <NavClosed />
        <Component {...pageProps} />
      </motion.div>
      <AnimatePresence>{isNavOpen && <NavOpen />}</AnimatePresence>
    </>
  );
}
