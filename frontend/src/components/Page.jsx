import { motion } from "framer-motion";

const Page = ({ children, className = "" }) => (
  <motion.main
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.28, ease: "easeOut" }}
    className={`mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}
  >
    {children}
  </motion.main>
);

export default Page;
