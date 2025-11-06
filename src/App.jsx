import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, User, Loader2, Send, Zap, Moon, Sun } from 'lucide-react';

const API_ENDPOINT = 'https://vernanbackend.ezlab.in/api/contact-us/';
const PHONE_REGEX = /^\d{10}$/;

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20, delay: 0.1 } },
};

const iconVariants = {
  initial: { rotate: 0 },
  hover: { rotate: [0, 10, -10, 0], transition: { duration: 0.5 } },
};

const Logo = ({ isDark }) => (
  <div className="flex items-center space-x-2">
    <Zap className={`w-6 h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
    <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>ezlabs.</span>
  </div>
);

const DarkModeToggle = ({ isDark, setIsDark }) => (
  <button
    onClick={() => setIsDark(!isDark)}
    className="p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
  >
    {isDark ? <Sun className="w-6 h-6 text-yellow-400 hover:text-yellow-300" /> : <Moon className="w-6 h-6 text-gray-700 hover:text-gray-900" />}
  </button>
);

const FormInput = ({ id, label, Icon, placeholder, register, error, type = 'text', rules }) => {
  const isDark = document.documentElement.classList.contains('dark');
  const errorClass = error ? 'border-red-500 focus:ring-red-500' : (isDark ? 'border-gray-600 focus:ring-indigo-500' : 'border-gray-300 focus:ring-indigo-600');
  const inputBgClass = isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800 placeholder-gray-500';

  return (
    <div className="mb-5">
      <label htmlFor={id} className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className={`w-5 h-5 ${error ? 'text-red-500' : (isDark ? 'text-gray-400' : 'text-gray-400')}`} />
          </div>
        )}
        {type === 'textarea' ? (
          <textarea
            id={id}
            rows="4"
            placeholder={placeholder}
            aria-invalid={error ? "true" : "false"}
            className={`w-full p-3 transition duration-150 ease-in-out border rounded-lg shadow-sm ${inputBgClass} ${errorClass} ${Icon ? 'pl-3' : 'pl-3'}`}
            {...register(id, rules)}
          ></textarea>
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            aria-invalid={error ? "true" : "false"}
            className={`w-full p-3 transition duration-150 ease-in-out border rounded-lg shadow-sm ${inputBgClass} ${errorClass} ${Icon ? 'pl-10' : 'pl-3'}`}
            {...register(id, rules)}
          />
        )}
      </div>
      {error && (
        <AnimatePresence>
          <motion.p
            role="alert"
            className="mt-1 text-sm text-red-500 font-medium"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error.message}
          </motion.p>
        </AnimatePresence>
      )}
    </div>
  );
};

const ContactForm = ({ isDark }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm({ mode: 'onSubmit' });
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' | 'error'

  const onSubmit = async (data) => {
    setSubmissionStatus(null);
    const payload = { name: data.name, email: data.email, phone: data.phone, message: data.message };

    try {
      const res = await axios.post(API_ENDPOINT, payload, { headers: { 'Content-Type': 'application/json' } });
      if (res.status === 200 || res.status === 201) {
        setSubmissionStatus('success');
        toast.success("Form Submitted successfully!");
        // Requirement: show “Form Submitted” in the text field (message)
        reset({ name: '', email: '', phone: '', message: 'Form Submitted' });
      } else {
        setSubmissionStatus('error');
        toast.error('Error submitting form');
      }
    } catch (err) {
      setSubmissionStatus('error');
      const msg = err?.response?.data?.detail || 'Network or server error';
      toast.error(msg);
      // console.error(err);
    }
  };

  const cardBgClass = isDark ? 'bg-gray-800 shadow-2xl shadow-indigo-900/50' : 'bg-white shadow-xl';
  const headerTextClass = isDark ? 'text-gray-100' : 'text-gray-900';
  const subHeaderTextClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const buttonClass = isSubmitting
    ? 'bg-indigo-400 cursor-not-allowed'
    : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/50';

  return (
    <motion.div
      className={`w-full max-w-lg mx-auto p-6 md:p-8 lg:p-10 rounded-2xl ${cardBgClass}`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
      aria-live="polite"
    >
      <header className="text-center mb-8">
        <h1 className={`text-3xl lg:text-4xl font-extrabold ${headerTextClass}`}>Get in Touch</h1>
        <p className={`mt-2 text-md ${subHeaderTextClass}`}>We'd love to hear from you. Please fill out the form below.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormInput
          id="name"
          label="Full Name"
          Icon={User}
          placeholder="John Doe"
          register={register}
          error={errors.name}
          type="text"
          rules={{ required: 'Name is required' }}
        />

        <FormInput
          id="email"
          label="Email Address"
          Icon={Mail}
          placeholder="you@example.com"
          register={register}
          error={errors.email}
          type="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
          }}
        />

        <FormInput
          id="phone"
          label="Phone Number"
          Icon={Phone}
          placeholder="10-digit number"
          register={register}
          error={errors.phone}
          type="tel"
          rules={{
            required: 'Phone number is required',
            pattern: { value: PHONE_REGEX, message: 'Phone number must be exactly 10 digits' }
          }}
        />

        <FormInput
          id="message"
          label="Your Message"
          placeholder="Tell us how we can help..."
          register={register}
          error={errors.message}
          type="textarea"
          rules={{ required: 'Message is required' }}
        />

        {/* Persistent status text (outside the input) */}
        <div className="h-6" aria-live="polite">
          <AnimatePresence>
            {submissionStatus === 'success' && (
              <motion.p className="text-center font-bold text-green-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Form Submitted
              </motion.p>
            )}
            {submissionStatus === 'error' && (
              <motion.p className="text-center font-bold text-red-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Error submitting form
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 mt-6 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50 ${buttonClass}`}
          disabled={isSubmitting}
          variants={iconVariants}
          whileHover="hover"
          aria-label="Submit Contact Form"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>
          ) : (
            <><Send className="w-5 h-5" /><span>Send Message</span></>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1f2937';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f9fafb';
    }
  }, [isDark]);

  useEffect(() => { document.title = "EZ Labs Contact Form"; }, []);

  const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';

  return (
    <div className={`min-h-screen py-10 px-4 flex flex-col items-center justify-center font-inter transition-colors duration-300 ${bgClass}`}>
      <header className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center w-full max-w-5xl mx-auto">
        <Logo isDark={isDark} />
        <div className="flex space-x-4 items-center">
          <h1 className="text-sm font-medium hidden sm:block">Frontend Intern Test</h1>
          <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </header>
      <main className="mt-20 w-full flex-grow flex items-center justify-center">
        <ContactForm isDark={isDark} />
      </main>
      <Toaster position="bottom-center" toastOptions={{
        className: isDark ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-800',
        success: { iconTheme: { primary: '#4f46e5', secondary: 'white' } },
      }} />
    </div>
  );
};

export default App;
