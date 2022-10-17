import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const NavigationButtons: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <FiChevronLeft />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
        onClick={() => navigate(1)}
      >
        <FiChevronRight />
      </motion.button>
    </div>
  );
};

export default NavigationButtons;
