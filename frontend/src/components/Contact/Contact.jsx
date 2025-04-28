import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [focused, setFocused] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDismiss = () => {
    setFormStatus({
      submitted: false,
      success: false,
      error: false,
      message: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      setLoading(false);
      return;
    }

    try {
      const serviceId = 'service_fgzfdb1';
      const templateId = 'template_5upossb';
      const publicKey = 'VTRTGEJyFtypenYn4';

      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      if (result.status === 200) {
        setFormStatus({
          submitted: true,
          success: true,
          error: false,
          message: 'Your message has been sent successfully!'
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });

        formRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({
        submitted: true,
        success: false,
        error: true,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id = 'contact' className="min-h-screen bg-gradient-to-r from-gray-900 to-blue-900 flex justify-center items-center p-4">
      <div className="max-w-5xl w-full bg-black bg-opacity-30 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Content */}
        <motion.div 
          className="md:w-1/2 p-8 md:p-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h3 className="text-blue-400 uppercase text-sm tracking-wider mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            HAVE A PROJECT IN MIND?
          </motion.h3>

          <motion.h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            We help you to<br />
            grow your business<br />
            faster & easier.
          </motion.h1>

          <motion.p className="text-gray-400 text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Amet minim mollit non deserunt<br />
            ullamco est sit aliqua dolor.
          </motion.p>
        </motion.div>

        {/* Right Form */}
        <motion.div 
          className="md:w-1/2 p-8 md:p-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top form title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-white text-2xl font-semibold mb-2">Let us know about your project</h2>
            <p className="text-gray-400 text-sm">Fill in the details and we’ll get back to you soon.</p>
          </motion.div>

          {/* Confirmation Message */}
          {formStatus.submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-md text-sm font-semibold shadow-md relative
                ${formStatus.success 
                  ? 'bg-green-100 text-green-800 border border-green-400' 
                  : 'bg-red-100 text-red-800 border border-red-400'
                }`}
            >
              <span>{formStatus.message}</span>
              <button 
                onClick={handleDismiss}
                className="absolute top-1 right-2 text-lg font-bold text-gray-500 hover:text-gray-700"
                aria-label="Dismiss message"
              >
                &times;
              </button>
            </motion.div>
          )}

          {/* Contact Form */}
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <InputField name="name" value={formData.name} handleChange={handleChange} placeholder="First & Last name *" focused={focused} setFocused={setFocused} delay={0.3} />
            <InputField name="email" value={formData.email} handleChange={handleChange} placeholder="Email address *" focused={focused} setFocused={setFocused} delay={0.35} />
            <InputField name="phone" value={formData.phone} handleChange={handleChange} placeholder="Phone number" focused={focused} setFocused={setFocused} delay={0.4} />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 bg-transparent border-b ${focused === 'message' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'} text-white focus:outline-none transition-all duration-300`}
                placeholder="Write your message *"
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={loading}
                className="border border-blue-500 bg-transparent hover:bg-blue-500 text-white py-3 px-8 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </span>
                <span className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ name, value, handleChange, placeholder, focused, setFocused, delay }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
    >
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full p-3 bg-transparent border-b ${focused === name ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'} text-white focus:outline-none transition-all duration-300`}
        placeholder={placeholder}
        onFocus={() => setFocused(name)}
        onBlur={() => setFocused(null)}
      />
    </motion.div>
  );
}

