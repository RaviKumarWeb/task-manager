import React from "react";
import Task from "../components/Task";
import { tasks } from "../data";

const Completed = () => {
  // Filter completed tasks
  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className=" py-10 flex flex-col">
      <span className=" self-center flex md:w-1/3 justify-center font-semibold gap-1 py-1 mb-5 px-3 border rounded-full text-xl md:text-base border-gray-300 text-gray-600">
        Completed Tasks
      </span>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.title}
              des={task.description}
              priority={task.priority}
              date={task.dueDate}
              status={task.status}
              // Pass any other necessary props to Task component
            />
          ))
        ) : (
          <p>No completed tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Completed;
