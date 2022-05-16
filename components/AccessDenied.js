import React from "react";
import { signIn } from "next-auth/react";

function AccessDenied() {
  return (
    <>
      <div className="flex justify-center text-center mt-10">
        <div className="rounded-md bg-red-50/70 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-3xl font-bold text-red-700">Access Denied</h3>
              <p className="text-base font-medium text-red-700 mt-2">
                Sorry, but you can&apos;t create or see your jobs without Signing In.
              </p>
            </div>
          </div>
        </div>
        <br />
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