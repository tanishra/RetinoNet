
"use client"

import React, { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const SignupPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      })

      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
    } catch (error) {
      console.error("Signup failed:", error)
      alert("Signup failed. Please check your inputs.")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden md:flex-row flex-col">

      {/* Left side - Form */}
      <div className="flex w-full h-full items-center justify-center bg-white px-6 py-4 md:w-1/2 md:p-10 overflow-auto">
      <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-black">Create an account</h1>
            <p className="text-sm text-gray-500">Enter your information below to create your account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Sign Up
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-gray-500">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Quote */}
      <div className="hidden md:flex w-full h-full items-center justify-center bg-black p-10 text-white md:w-1/2">
      <div className="max-w-md space-y-6">
          <blockquote className="space-y-2">
            <p className="text-2xl font-light italic leading-relaxed">
              "The future belongs to those who believe in the beauty of their dreams."
            </p>
            <footer className="text-sm font-medium">— Eleanor Roosevelt</footer>
          </blockquote>
          <p className="text-sm text-gray-400">
            Join thousands of users who are already experiencing the difference. Our platform provides you with the
            tools you need to succeed.
          </p>
        </div>
      </div>
    </div>
  )
}

export const Signup = SignupPage
