import { useNavigate } from "@reach/router";
import React, { FunctionComponent } from "react";
import { BsGearWideConnected } from "react-icons/bs";

interface SettingsFabProps {}

const SettingsFab: FunctionComponent<SettingsFabProps> = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/experiment-501.V2/settings")}
      className="rounded-full h-16 w-16 fixed left-8 bottom-8 hover:bg-black hover:text-white flex justify-center items-center shadow-md hover:pointer"
    >
      <BsGearWideConnected />
    </button>
  );
};

export default SettingsFab;
