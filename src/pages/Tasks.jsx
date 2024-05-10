import React, { useState } from "react";
import Task from "../components/Task";
import { tasks } from "../data";
import { MdAddTask } from "react-icons/md";

const Tasks = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [tasksList, setTasksList] = useState(tasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    status: "todo",
  });

  // State for sorting
  const [sortBy, setSortBy] = useState(null);

  // Filter tasks based on the selected status
  const filteredTasks =
    selectedStatus === "all"
      ? tasksList
      : tasksList.filter((task) => task.status === selectedStatus);

  // Function to handle updating a task
  const handleUpdate = (id, updatedTask) => {
    // Update the task in the tasks array
    const updatedTasks = tasksList.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    // Update the tasks state
    setTasksList(updatedTasks);
  };

  // Function to handle deleting a task
  const handleDelete = (id) => {
    // Filter out the task with the given id
    const updatedTasks = tasksList.filter((task) => task.id !== id);
    // Update the tasks state
    setTasksList(updatedTasks);
  };

  // Function to handle sorting tasks
  const handleSort = (type) => {
    if (sortBy === type) {
      setSortBy(null);
    } else {
      setSortBy(type);
    }
  };

  // Function to handle adding a new task
  const handleAddTask = () => {
    setIsAddingTask(true);
  };

  // Function to handle saving the new task
  const handleSaveTask = () => {
    const id = Math.max(...tasksList.map((task) => task.id)) + 1;
    // Add the new task to the beginning of the tasks array
    setTasksList([{ id, ...newTask }, ...tasksList]);
    setIsAddingTask(false);
    setNewTask({
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      status: "todo",
    });
  };

  return (
    <div className="">
      <div className="py-10">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2 px-5 rounded-md"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="todo">Todo</option>
        </select>
      </div>
      <div className="flex justify-between mb-5">
        <button
          className="py-2 px-4 rounded-md bg-indigo-700 text-white mr-3"
          onClick={() => handleSort("priority")}
        >
          Sort by Priority
        </button>
        <button
          className="py-2 px-4 rounded-md bg-indigo-700 text-white"
          onClick={() => handleSort("dueDate")}
        >
          Sort by Due Date
        </button>
      </div>
      <div className="mb-5">
        <button
          className="py-2 px-4 flex items-center gap-3 rounded-md bg-green-500 text-white"
          onClick={handleAddTask}
        >
          <MdAddTask className=" text-xl" /> Add Task
        </button>
      </div>
      {isAddingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white shadow-md flex flex-col gap-5 w-[350px] rounded-md p-4">
            <h2>Add New Task</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="border py-2 px-4 rounded-md"
              placeholder="Title"
            />
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border py-2 px-4 rounded-md"
              placeholder="Description"
            ></textarea>
            <input
              type="text"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="border py-2 px-4 rounded-md"
              placeholder="Priority"
            />
            <input
              type="date"
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              className="border py-2 px-4 rounded-md"
              placeholder="Due Date"
            />
            <div className="border-t-2  mt-3 pb-5 pt-5 flex items-center justify-between">
              <button
                className="py-2 px-4 rounded-md bg-green-500 text-white"
                onClick={handleSaveTask}
              >
                Save
              </button>
              <button
                className="py-2 px-4 rounded-md bg-orange-500 text-white"
                onClick={() => setIsAddingTask(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {filteredTasks.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTasks
            .sort((a, b) => {
              if (sortBy === "priority") {
                // Sort by priority
                const priorityOrder = ["Low", "Medium", "High"];
                return (
                  priorityOrder.indexOf(a.priority) -
                  priorityOrder.indexOf(b.priority)
                );
              } else if (sortBy === "dueDate") {
                // Sort by due date
                return new Date(a.dueDate) - new Date(b.dueDate);
              } else {
                return 0;
              }
            })
            .map((each) => (
              <Task
                key={each.id}
                id={each.id}
                name={each.title}
                des={each.description}
                priority={each.priority}
                date={each.dueDate}
                status={each.status}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <h1 className="text-slate-900 text-6xl text-center">No Tasks </h1>
        </div>
      )}
    </div>
  );
};

export default Tasks;
