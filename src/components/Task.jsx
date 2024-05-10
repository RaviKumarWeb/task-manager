import { useLocation } from "react-router-dom";

import React, { useState } from "react";

const Task = ({
  id,
  name,
  des,
  priority,
  date,
  status,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(des);
  const [updatedPriority, setUpdatedPriority] = useState(priority);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const location = useLocation();
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(id, {
      name: updatedName,
      description: updatedDescription,
      priority: updatedPriority,
      date: updatedDate,
      status: updatedStatus,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-md p-4 ${
        location.pathname === "/" ? "h-[280px]" : "h-[200px]"
      }`}
    >
      <p className="text-[16px] text-blue-700 font-medium uppercase">
        {priority} PRIORITY
      </p>

      <div className="">
        <div className="flex items-center gap-3 mt-2">
          <h3>{name}</h3>
        </div>
        <p className="text-[16px] mt-3 font-semibold">{des}</p>

        <div className=" flex items-center justify-between py-4">
          <p className=" text-[16px] flex items-center gap-3 border p-2 rounded-md">
            <span
              className={`block w-4 h-4 rounded-full ${
                status === "completed"
                  ? "bg-green-800"
                  : status === "in-progress"
                  ? "bg-orange-800"
                  : "bg-indigo-800"
              }`}
            ></span>
            {status}
          </p>
          <p className="text-right">{date}</p>
        </div>

        {location.pathname === "/" && (
          <div className="border-t-2 flex items-center justify-between py-5">
            <button
              className="py-2 px-5 rounded-md bg-indigo-700 text-white transition-all duration-300 hover:bg-indigo-500"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="py-2 px-5 rounded-md bg-slate-700 text-white transition-all duration-300 hover:bg-red-500"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-md flex flex-col gap-5 w-[350px] rounded-md p-4">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="border py-2 px-4 rounded-md"
              placeholder="Name"
            />
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              className="border py-2 px-4 rounded-md"
              placeholder="Description"
            ></textarea>
            <input
              type="text"
              value={updatedPriority}
              onChange={(e) => setUpdatedPriority(e.target.value)}
              className="border py-2 px-4 rounded-md"
              placeholder="Priority"
            />
            <input
              type="date"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
              className="border py-2 px-4 rounded-md"
              placeholder="Date"
            />

            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="border py-2 px-4 rounded-md"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              className="py-2 px-4 rounded-md bg-indigo-500 text-white"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
