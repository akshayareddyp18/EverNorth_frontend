import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, Calendar, Phone, ArrowLeft } from "lucide-react";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import {
  validateMemberId,
  validateDOB,
  validateMobile,
  validateOTP,
} from "../utils/validation";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    memberId: "",
    dateOfBirth: "",
    contactNo: "",
    otp: "",
  });
  const [errors, setErrors] = useState({
    memberId: "",
    dateOfBirth: "",
    contactNo: "",
    otp: "",
  });
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateForm = (): boolean => {
    const newErrors = {
      memberId: validateMemberId(formData.memberId) || "",
      dateOfBirth: validateDOB(formData.dateOfBirth) || "",
      contactNo: validateMobile(formData.contactNo) || "",
      otp: showOTP ? validateOTP(formData.otp) || "" : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleGenerateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {

      const response = await axios.post("http://localhost:8081/users/generate-otp", {
        memberId: formData.memberId,
        dateOfBirth: formData.dateOfBirth,
        contactNo: formData.contactNo,
      });

      if (response.status === 200) {
        setShowOTP(true);
        setTimer(30);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(`Unexpected status code: ${response.status}`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || `Failed to generate OTP.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {

      const response = await axios.post("http://localhost:8081/users/validate-otp", {
        memberId: formData.memberId,
        otp: formData.otp,
      });

      if (response.status === 200) {
        login();
        navigate("/profile-setup");
        toast.success("Validation successful!");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid OTP. Please try again.");
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
            <h1 className="text-2xl font-bold text-gray-900">Member Validation</h1>
            <p className="mt-1 text-gray-600">Please verify your identity to continue</p>
          </div>
        </div>

        <form onSubmit={showOTP ? handleValidate : handleGenerateOTP} className="space-y-4">
          <Input
            icon={UserCheck}
            label="Member ID"
            placeholder="Enter your member ID"
            value={formData.memberId}
            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
            error={errors.memberId}
            required
            disabled={showOTP}
          />

          <Input
            icon={Calendar}
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            error={errors.dateOfBirth}
            required
            disabled={showOTP}
          />

          <Input
            icon={Phone}
            label="Mobile Number"
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={formData.contactNo}
            onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            error={errors.contactNo}
            required
            disabled={showOTP}
          />

          {showOTP && (
            <div className="space-y-2">
              <Input
                label="OTP"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                error={errors.otp}
                required
                maxLength={6}
              />
              {timer > 0 ? (
                <p className="text-sm text-gray-600">Resend OTP in {timer} seconds</p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(30);
                    toast.success("New OTP sent successfully!");
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || (showOTP && timer === 0)}
          >
            {loading ? "Processing..." : showOTP ? "Validate OTP" : "Generate OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
