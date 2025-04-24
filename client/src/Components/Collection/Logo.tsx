import { motion } from "framer-motion";

const AnimatedLogo = () => {
  return (
    <div className="flex items-center overflow-hidden h-12 relative w-[270px]">
      {/* Tractor moving in */}
      <motion.img
        src="/images/logo.png"
        alt="Tractor"
        className="absolute left-0 -top-14  h-36"
        initial={{ x: -110 }}
        animate={{ x: 120 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Brand name fading in behind tractor */}
      <motion.h1
        className=" font-extrabold text-2xl text-[#0f440b]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        KRISHI BAZAR
      </motion.h1>
    </div>
  );
};

export default AnimatedLogo;
