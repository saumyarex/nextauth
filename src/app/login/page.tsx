"use client";
import React, { InputEventHandler } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [loading, setloading] = React.useState(false);

  React.useEffect(() => {
    //console.log(user);
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);

  const handleChange = (e: any) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setloading(true);
      const response = await axios.post("/api/user/login", user);

      console.log("Login success", response);
      toast.success("Login success");
      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-4xl font-bold">
        {" "}
        {loading ? "Processing" : " Login "}{" "}
      </h1>

      <form onSubmit={(e) => login(e)} className="flex mt-5 flex-col gap-5">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="username or email"
          id="username"
          value={user.username}
          onChange={(e) => handleChange(e)}
          className="bg-gray-700 py-2 px-2 rounded text-white"
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          id="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          className="bg-gray-700 py-2 px-2 rounded text-white"
        />

        <button
          className="bg-blue-500 py-1 rounded hover:cursor-pointer hover:bg-blue-600 disabled:bg-blue-300 disabled:hover:cursor-default"
          disabled={buttonDisable}
        >
          Login
        </button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default LoginPage;
