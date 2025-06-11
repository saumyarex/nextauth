"use client";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = React.useState({
    token: "",
  });
  const [loading, setloading] = React.useState(false);
  const serchParams = useSearchParams();

  React.useEffect(() => {
    const extractedToken: string = serchParams.get("token") || "";
    setToken({ token: extractedToken });
  }, [serchParams]);

  const sendToken = async () => {
    try {
      setloading(true);
      console.log(token);
      const response = await axios.post("/api/user/verify", token);
      if (response.data.status !== 200) {
        toast.error(response.data.error);
      } else {
        toast.success("Email verified");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occur");
      }
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="flex flex-col gap-5 min-h-screen justify-center items-center">
      <h1 className="text-3xl font-medium">
        {loading ? "Processing" : "Click below to get verify"}
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 py-2 px-7 rounded hover:cursor-pointer font-semibold"
        onClick={sendToken}
      >
        Verify
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
}
