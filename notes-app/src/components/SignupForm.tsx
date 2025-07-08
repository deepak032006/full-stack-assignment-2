import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    // Simple validation
    if (!name || !dob || !email) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("https://full-stack-assignment-2-0n7g.onrender.com/api/auth/signup", {
        name,
        dob,
        email,
      });

      navigate("/verify", { state: { email } });
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <img src="/assets/HDLogo.png" alt="HD Logo" className="h-15 w-auto mb-6" />


      <h1 className="text-3xl font-bold mb-2">Sign up</h1>
      <p className="text-gray-500 mb-6">Sign up to enjoy the feature of HD</p>

      <input
        className="w-full border border-gray-300 rounded-md p-3 mb-4"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="relative mb-4">
        <input
          type="date"
          className="w-full border border-gray-300 rounded-md p-3 pr-10"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <input
        className="w-full border border-blue-500 border-2 rounded-md p-3 mb-4"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600"
      >
        Get OTP
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <p className="text-sm text-center mt-6">
        Already have an account??{" "}
        <a href="/signin" className="text-blue-600 underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
