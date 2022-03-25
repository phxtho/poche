import { FunctionComponent } from "react";

interface MenuItemProps {
  className?: string;
  onClick?: any;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      className={`h-12 w-full px-4 py-3 bg-gray-200 opacity-80 rounded-xl flex justify-between items-center hover:bg-gray-800 hover:text-white ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MenuItem;
