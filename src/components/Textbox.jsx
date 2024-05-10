import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className=" w-full flex-col gap-1">
        {label && <label className=" text-slate-800">{label}</label>}
        <div className="">
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              " bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
            required
          />
        </div>
      </div>
    );
  }
);

export default Textbox;
