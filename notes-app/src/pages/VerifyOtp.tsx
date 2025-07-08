import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function VerifyOtp() {
  const { state } = useLocation();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: state.email,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.user.email);

      navigate("/welcome");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email: state.email,
      });
      alert("OTP resent!");
    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
      <input
        className="border p-2 w-full"
        placeholder="6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="bg-green-600 text-white p-2 mt-2 w-full" onClick={handleVerify}>
        Verify & Login
      </button>

      <div
        className="text-sm text-blue-600 mt-3 cursor-pointer text-center"
        onClick={handleResend}
      >
        Resend OTP
      </div>
    </div>
  );
}

export default VerifyOtp;
