import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null); // Change initial state to null

  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(data.user.photoURL);
      const userData = {
        name: data.user.displayName,
        profile: data.user.photoURL,
        email: data.user.email,
      };
      localStorage.setItem("user", JSON.stringify(userData)); // Store user after setting it
      setUser(userData); // Set user state after storing it
    });
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className=" w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className=" w-full md:w-auto flex gap-0 lg:gap-40 flex-col lg:flex-row items-center">
        {/* left side */}
        <div className=" h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className=" w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className=" flex gap-1 py-1 px-3 border rounded-full text-xl md:text-base border-gray-300 text-gray-600">
              Managage all your task in one place
            </span>
            <p className=" flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700 antialiased">
              <span>Web Based</span>
              <span>Task Manager</span>
            </p>

            <div className="">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className=" w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form className=" form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14">
            <div className="">
              <p className=" text-blue-600 text-3xl font-bold text-center">
                Welcome back!
              </p>
              <p className=" text-center text-base text-gray-700">
                {" "}
                Keep all your credential safe.
              </p>
            </div>

            <div className=" flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className=" w-full rounded-full"
              />
              <Textbox
                placeholder="Your password"
                type="password"
                name="password"
                label="Password"
                className=" w-full rounded-full"
              />

              <span className=" text-[14px] text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Forgot password
              </span>

              <Button
                type="submit"
                label="submit"
                className=" w-full h-10 bg-blue-700 text-white"
              />

              <p className="text-center text-red-500 text-xl mt-3">Use Google Login These Functionality Not Work</p>

              
            </div>
            <hr />

            <button
              type="button"
              className=" flex items-center justify-center gap-5 py-3 px-4 rounded-md bg-slate-800 text-white"
              onClick={handleClick}
            >
              <FcGoogle className=" text-2xl" /> Login with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
