import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdTaskAlt, MdOutlinePendingActions } from "react-icons/md";
import { SiProtodotio } from "react-icons/si";
const linkData = [
  {
    label: "Tasks",
    link: "/",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "/in-progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "/todo",
    icon: <SiProtodotio />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="p-4 h-screen">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-800 p-2 rounded-full flex items-center justify-center">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="text-white text-2xl font-black"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 5.18L10.59 16.6l-4.24-4.24 1.41-1.41 2.83 2.83 10-10L22 5.18zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.57 0 3.04.46 4.28 1.25l1.45-1.45A10.02 10.02 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.73 0 3.36-.44 4.78-1.22l-1.5-1.5c-1 .46-2.11.72-3.28.72zm7-5h-3v2h3v3h2v-3h3v-2h-3v-3h-2v3z"></path>
          </svg>
        </div>
        <span className="text-2xl font-bold antialiased tracking-wide">
          TaskMan
        </span>
      </div>

      <div className="py-24">
        <div className="flex flex-col items-center gap-8">
          {linkData.map((each) => (
            <Link
              key={each.label}
              to={each.link}
              className={`flex items-center gap-3 text-base w-full rounded-lg py-2 px-3 border ${
                location.pathname === each.link
                  ? "bg-indigo-700 text-white"
                  : ""
              }`}
            >
              {each.icon} {each.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
