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
      className={`h-12 w-full max-w-xs px-4 py-3 bg-gray-200 opacity-80 rounded-xl flex justify-between items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MenuItem;
