import clsx from "clsx";
import React from "react";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={clsx(" px-3 outline-none rounded-md", className)}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
