import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://full-stack-assignment-2-0n7g.onrender.com/api/auth/verify-otp", {
        email,
        otp,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", user.email);

      navigate("/welcome");
    } catch (err) {
      alert("Login failed");
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post("https://full-stack-assignment-2-0n7g.onrender.com/api/auth/signup", { email });
      alert("OTP resent!");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <img src="/assets/HDLogo.png" alt="HD Logo" className="h-15 w-auto mb-6" />

          <h2 className="text-3xl font-bold mb-1">Sign in</h2>
          <p className="text-gray-500 mb-6">Please login to continue to your account.</p>

          <input
            className="border p-3 w-full rounded mb-4"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative mb-4">
            <input
              type={showOtp ? "text" : "password"}
              className="border p-3 w-full rounded pr-10"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowOtp(!showOtp)}
            >
              {showOtp ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {email && (
            <div
              className="text-sm text-blue-600 mb-4 cursor-pointer"
              onClick={resendOtp}
            >
              Resend OTP
            </div>
          )}

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm">Keep me logged in</label>
          </div>

          <button
            className="bg-blue-500 text-white p-3 w-full rounded font-semibold"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <p className="text-sm text-center mt-6">
            Need an account?{" "}
            <a href="/" className="text-blue-600 underline">
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Background image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/background.jpg.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignIn;
