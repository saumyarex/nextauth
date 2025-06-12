"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      await axios.post("/api/user/login", user);
      toast.success("Login success");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
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
      <div className="mt-3 flex flex-col items-center text-lg text-gray-400">
        <p>
          <Link
            href={"/password-reset"}
            className="text-center hover:text-gray-200"
          >
            Forgot Password
          </Link>
        </p>
        <p>Don&#39;t have account</p>
        <p>
          <Link href={"/signup"} className="text-center hover:text-gray-200">
            Sign Up
          </Link>
        </p>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default LoginPage;
