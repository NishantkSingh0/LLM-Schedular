import { motion } from "framer-motion";

function Animate({ children }) {

  const pageVariants={
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const transition = { duration: 0.3, ease: "easeInOut" }; // faster + smooth

  return (
    <motion.div
      // className="absolute top-0 left-0 w-full min-h-screen bg-gray-900 text-white" // match your background
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

export default Animate;