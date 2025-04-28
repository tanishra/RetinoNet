import { useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { Button } from "./Button";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin error:", err);
      alert("Signin failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Signin form */}
      <div className="flex w-full items-center justify-center bg-white p-6 md:w-1/2 md:p-10">
        <div className="w-full max-w-md">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <div className="pt-4">
            <InputBox
              placeholder="Enter your email"
              label={"Email"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <InputBox
              placeholder="Enter your password"
              label={"Password"}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>
          <div className="pt-6">
            <BottomWarning
              label={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>

      {/* Right side - Quote */}
      <div className="flex w-full items-center justify-center bg-black p-6 text-white md:w-1/2 md:p-10">
        <div className="max-w-md space-y-6">
          <blockquote className="space-y-2">
            <p className="text-2xl font-light italic leading-relaxed">
              "Success is not final, failure is not fatal: It is the courage to continue that counts."
            </p>
            <footer className="text-sm font-medium">— Winston Churchill</footer>
          </blockquote>
          <p className="text-sm text-gray-400">
            Welcome back. We've been waiting for you. Sign in to continue your journey with us.
          </p>
        </div>
      </div>
    </div>
  );
};

