"use client";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { frontendErrors } from "@/helpers/frontendError";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [token, setToken] = React.useState({
    token: "",
  });
  const [loading, setloading] = React.useState(false);
  const [verification, setVerification] = React.useState(true);
  const serchParams = useSearchParams();

  const extractedToken: string = serchParams.get("token") || "";
  React.useEffect(() => {
    setToken({ token: extractedToken });
  }, [extractedToken]);

  const requestNewToken = async () => {
    try {
      setloading(true);
      const payload = {
        prevToken: extractedToken,
      };
      await axios.patch("api/user/reverify", payload);
      toast.success("Verification email sent");
    } catch (error: unknown) {
      frontendErrors(error);
    } finally {
      setloading(false);
    }
  };

  const sendToken = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/user/verify", token);
      if (response.data.status !== 200) {
        toast.error(response.data.error);
        setVerification(false);
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
        {loading ? "Processing..." : "Click below to get verify"}
      </h1>
      <button
        className={`bg-blue-500 hover:bg-blue-600 py-2 px-7 rounded hover:cursor-pointer font-semibold ${
          verification ? "block" : "hidden"
        }`}
        onClick={sendToken}
      >
        Verify
      </button>

      <button
        className={`bg-blue-500 hover:bg-blue-600 py-2 px-7 rounded hover:cursor-pointer font-semibold ${
          verification ? "hidden" : "block"
        } `}
        onClick={requestNewToken}
      >
        Request new token
      </button>

      <Toaster position="bottom-center" />
    </div>
  );
}
