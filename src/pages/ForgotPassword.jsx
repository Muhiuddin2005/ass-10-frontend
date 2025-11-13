import React, { useRef } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ForgotPassword = () => {
  const emailRef = useRef();

  const handleReset = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      toast("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast("Check your inbox or spam folder to reset your password!");
        e.target.reset();
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleReset}
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-sm text-center mb-4">
          Enter your registered email address and we’ll send you a reset link.
        </p>

        <label className="block font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          ref={emailRef}
          placeholder="example@email.com"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
        >
          Send Reset Link
        </button>

        <div className="text-center mt-3">
          <Link
            to="/logIn"
            className="text-sm text-blue-500 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
