import "@/styles/globals.css";
import Navbar from "../components/nav-bar";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import calendarStore from "../store/calendar";

export default function App({ Component, pageProps }: AppProps) {
  const { isNavOpen } = calendarStore((state) => state);
  return (
    <div className="w-full h-full fixed dir overflow-hidden font-rubik">
      <motion.div
        animate={
          isNavOpen
            ? {
                x: 300,
                pointerEvents: "none",
              }
            : {
                x: 0,
                pointerEvents: "auto",
              }
        }
        transition={{ duration: 0.8 }}
        className="w-full h-full"
      >
        <Component {...pageProps} />
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full absolute top-0 right-0 bg-black/80 z-10 backdrop-blur-[4px] pointer-events-auto"
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>{isNavOpen && <Navbar />}</AnimatePresence>
    </div>
  );
}
