import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Completed from "./pages/Completed";
import InProgress from "./pages/InProgress";
import Todo from "./pages/Todo";
function Layout() {
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className=" w-1/5  h-screen bg-white sticky top-0 hidden lg:block">
        <Sidebar />
      </div>
      {/* <MobileSidebar/> */}

      <div className=" flex-1 overflow-y-auto">
        <Navbar />
        <div className=" p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

const App = () => {
  return (
    <main className=" w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/in-progress" element={<InProgress />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
};

export default App;
