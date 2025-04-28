import React, { useState, useEffect } from 'react';
import { Eye, Activity, Award, Users } from 'lucide-react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Eye className="text-blue-400" />,
      title: "Advanced Detection",
      description: "Our AI-powered platform accurately detects diabetic retinopathy in retinal images with high precision and minimal false positives."
    },
    {
      icon: <Activity className="text-blue-400" />,
      title: "Real-time Analysis",
      description: "Get immediate results from our sophisticated algorithm that analyzes retinal images in seconds."
    },
    {
      icon: <Award className="text-blue-400" />,
      title: "Clinically Validated",
      description: "Our detection system has been validated through rigorous clinical trials and partnerships with leading ophthalmologists."
    },
    {
      icon: <Users className="text-blue-400" />,
      title: "Accessibility",
      description: "Bringing advanced diagnostics to underserved communities, making early detection accessible to everyone."
    }
  ];

  return (
      <div id="about" className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900 flex justify-center items-center p-4">
      {/* Glass panel effect similar to the screenshot */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-black/80 rounded-2xl p-8 md:p-12 border border-blue-900/30 shadow-xl">
          {/* Header section with animation */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-blue-400 font-semibold mb-2 tracking-wider text-sm">ABOUT OUR TECHNOLOGY</h2>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Revolutionizing Diabetic Retinopathy Detection
            </h1>
            <div className="h-1 w-20 bg-blue-500 mb-8"></div>
            <p className="text-lg text-gray-300 max-w-3xl">
              We're dedicated to transforming diabetic eye care through cutting-edge AI technology. Our platform enables early detection of diabetic retinopathy through advanced image analysis, potentially saving the vision of millions worldwide.
            </p>
          </div>

          {/* Feature grid with upscale hover effects */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-blue-950/20 p-6 rounded-lg border border-blue-900/50 
                  transition-all duration-500 hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10 
                  transform hover:scale-105 hover:-translate-y-1 cursor-pointer
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                <div className="p-3 bg-black/40 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background subtle elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 border border-blue-500/10 rounded-lg rotate-12 opacity-30"></div>
      <div className="absolute top-20 left-10 w-16 h-16 border border-blue-400/10 rounded-full opacity-20"></div>
    </div>
  );
}