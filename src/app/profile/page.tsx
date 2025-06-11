"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function ProfilePage() {
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
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h1 className="text-4xl font-semibold">User Profile</h1>
      <p className="text-2xl">Username : {user.username}</p>
      <p className="text-2xl">Email : {user.email}</p>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default ProfilePage;
