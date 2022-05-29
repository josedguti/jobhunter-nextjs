import React from "react";
import { signIn } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

function AccessDenied() {

  toast.warn("You need to sign in!", {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastId: "success1",
  });

  return (
    <>
    <ToastContainer limit={1}/>
      <div className="flex justify-center text-center mt-10">
      <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="red" radius="md">
      Something terrible happened, you made a mistake and there is no going back!
      <h1>I&apos;m joking, you just need to sign in!</h1>
    </Alert>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
          className="relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-7"
        >
          Sign In
        </button>
      </div>
    </>
  );
}

export default AccessDenied;