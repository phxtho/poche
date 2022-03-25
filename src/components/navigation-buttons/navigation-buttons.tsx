import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface NavigationButtonsProps {}

const NavigationButtons: FunctionComponent<NavigationButtonsProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-4">
      <button
        className="rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
        onClick={() => navigate(-1)}
      >
        <FiChevronLeft />
      </button>
      <button
        className="rounded-full h-8 w-8 bg-gray-200 hover:opacity-80 hover:bg-gray-800 hover:text-white  flex justify-center items-center"
        onClick={() => navigate(1)}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default NavigationButtons;
