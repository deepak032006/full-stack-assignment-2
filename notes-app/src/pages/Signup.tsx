// src/pages/Signup.tsx
import React from "react";
import SignupForm from "../components/SignupForm";
import BackgroundImage from "../components/BackgroundImage";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <SignupForm />
      </div>

      {/* Right Side: Background (Desktop only) */}
      <div className="hidden md:block w-1/2">
        <BackgroundImage />
      </div>
    </div>
  );
};

export default Signup;
