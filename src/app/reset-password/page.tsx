"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function ResetPasswordPage() {
  const [password, setPassword] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = React.useState("");
  const [loading, setloading] = React.useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const extractedToken = params.get("token");

  function matchConfirmPassword() {
    if (!(password.password === password.confirmPassword)) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }

  React.useEffect(() => {
    matchConfirmPassword();
  }, [password]);

  const updatePassword = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setloading(true);
    const payload = {
      ...password,
      resetToken: extractedToken,
    };
    try {
      //console.log(payload);
      await axios.patch("api/user/password", payload);
      toast.success("Password changed");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong try again!");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="text-4xl font-semibold">
        {loading ? "Updating password..." : "Enter new password"}
      </h1>

      <form
        onSubmit={(e) => updatePassword(e)}
        className="flex flex-col gap-5 items-center"
      >
        <input
          type="password"
          placeholder="Enter password"
          className="py-2 px-5 bg-gray-700 rounded"
          required
          value={password.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="py-2 px-5 bg-gray-700 rounded"
          required
          value={password.confirmPassword}
          onChange={(e) =>
            setPassword({ ...password, confirmPassword: e.target.value })
          }
        />
        <p className="text-red-600 font-medium text-xl">{error && error}</p>
        <button className="bg-blue-500 py-1 rounded px-5 hover:bg-blue-600 hover:cursor-pointer w-32">
          Submit
        </button>
      </form>

      <Toaster position="bottom-center" />
    </div>
  );
}

export default ResetPasswordPage;
