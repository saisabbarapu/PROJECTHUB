import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaPaperPlane } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    const mailtoLink = `mailto:projecthubs983@gmail.com?subject=Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0AFrom:%20${encodeURIComponent(email)}`;
    window.location.href = mailtoLink;

    setStatus('Message sent! Opening your email client...');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-10 sm:py-16 text-slate-100 sm:px-6 lg:px-8">
      {/* Ambient background glow orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-violet-600/25 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="glass-panel relative w-full max-w-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-violet-500/25"
      >
        <div className="mb-6 sm:mb-8 text-center">
          <span className="mb-2 sm:mb-3 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 font-mono text-[10px] sm:text-xs font-semibold text-violet-300">
            COMMUNITY & SUPPORT
          </span>
          <h1 className="font-sora text-2xl sm:text-3xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-1 sm:mt-2 font-sans text-xs text-slate-400">
            Have questions, feedback, or department integration requests? Reach out directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block font-sans text-xs font-medium text-slate-300">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaUser className="absolute left-3 top-3 text-xs text-slate-500" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-sans text-xs font-medium text-slate-300">
              Your Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaEnvelope className="absolute left-3 top-3 text-xs text-slate-500" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block font-sans text-xs font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we assist you?"
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/40 bg-gradient-to-r from-violet-500 to-blue-600 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-violet-500/20"
          >
            <FaPaperPlane className="text-xs" /> Send Message
          </motion.button>

          <AnimatePresence>
            {status && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-center font-mono text-xs font-medium text-violet-300"
              >
                {status}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;

