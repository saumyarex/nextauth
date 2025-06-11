"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
  });

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("api/user/profile");
        if (response.data.status !== 200) {
          toast.error(response.data.error);
        } else {
          const fectchedUserData = response.data.data;
          setUser({
            username: fectchedUserData.username,
            email: fectchedUserData.email,
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error occured");
        }
      }
    }

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("api/user/logout");
      toast.success("Logout success");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong try again");
      }
    }
  };
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="text-4xl font-semibold">User Profile</h1>
      <p className="text-2xl">Username : {user.username}</p>
      <p className="text-2xl">Email : {user.email}</p>
      <button
        className="bg-blue-500 py-1 px-5 rounded font-semibold hover:bg-blue-600 hover:cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default ProfilePage;
