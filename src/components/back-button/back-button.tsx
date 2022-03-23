import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { VscChevronLeft } from "react-icons/vsc";

interface BackButtonProps {}

const BackButton: FunctionComponent<BackButtonProps> = () => {
  const navigate = useNavigate();
  return (
    <button
      className="h-8 w-8 hover:bg-black hover:text-white rounded-full flex justify-center items-center"
      onClick={() => navigate(-1)}
    >
      <VscChevronLeft />
    </button>
  );
};

export default BackButton;
