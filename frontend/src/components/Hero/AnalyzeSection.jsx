import React, { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AnalyzeSection({ userId }) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setPrediction("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("user_id", userId); // Make sure this is passed properly

    try {
      const response = await axios.post("http://localhost:5001/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: false, // ⛔ make sure it's false for local dev unless you use cookies
      });
      
      if (response.data.success) {
        setPrediction(response.data.prediction);
      } else {
        setPrediction("Prediction failed.");
      }
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-6 mb-8 text-center"
    >
      <button
        onClick={handleClick}
        className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 text-lg inline-flex items-center shadow-lg hover:shadow-blue-500/50"
      >
        Analyze Your Retinal Image Now
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {isLoading && <p className="text-gray-400 mt-4">Analyzing image...</p>}
      {prediction && !isLoading && (
        <p className="text-lg text-green-500 mt-4 font-semibold">
          Prediction: {prediction}
        </p>
      )}

      <p className="text-sm text-gray-400 mt-3">
        Upload your retinal scan to get an AI-powered severity assessment.
      </p>
    </motion.div>
  );
}
