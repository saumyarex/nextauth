"use client";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function PasswordRestPage() {
  const [user, setUser] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const resetPassword = async () => {
    try {
      setloading(true);
      await axios.post("api/user/reset-password", user);
      toast.success("Password reset link sent");
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unaccepted error occured");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5">
      <h1 className="text-4xl font-bold">
        {loading ? "Sending email ..." : "Reset Password"}
      </h1>
      <input
        id="user"
        value={user}
        type="text"
        placeholder="username or email"
        className="py-2 px-5 bg-gray-700 rounded"
        onChange={(e) => setUser(e.target.value)}
      />
      <p className="text-xl">Clilck below to reset your password</p>
      <button
        className="bg-blue-500 py-2 px-5 rounded font-semibold hover:bg-blue-600 hover:cursor-pointer"
        onClick={resetPassword}
      >
        Reset Password
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default PasswordRestPage;
