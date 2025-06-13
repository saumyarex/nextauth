"use client";
import React from "react";
import { useParams } from "next/navigation";
function ProfileId() {
  const params = useParams();
  const { id } = params;
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-4xl text-pink-700 font-bold">User Id: {id}</h1>
    </div>
  );
}

export default ProfileId;
