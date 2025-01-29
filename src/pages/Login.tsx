import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Mail, ArrowLeft } from "lucide-react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import toast from "react-hot-toast";
import { validateMemberId, validateEmail } from "../utils/validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    memberId: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    memberId: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = {
      memberId: validateMemberId(formData.memberId) || "",
      email: validateEmail(formData.email) || "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulating OTP generation
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP

      toast.success(`OTP sent successfully to your email: ${otp}`);

      // Navigate to the OTP validation page with the hardcoded OTP and form data
      navigate("/otp-validation", {
        state: { memberId: formData.memberId, email: formData.email, otp },
      });
    } catch (error: any) {
      toast.error("Failed to generate OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            icon={ArrowLeft}
            onClick={() => navigate("/")}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            <p className="mt-1 text-gray-600">Enter your details to receive an OTP</p>
          </div>
        </div>

        <form onSubmit={handleGenerateOTP} className="space-y-4">
          <Input
            icon={UserCheck}
            label="Member ID"
            placeholder="Enter your member ID"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            error={errors.memberId}
            required
          />

          <Input
            icon={Mail}
            label="Email ID"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending OTP..." : "Generate OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
