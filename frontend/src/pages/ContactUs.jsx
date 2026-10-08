import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaPaperPlane } from 'react-icons/fa';

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
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-transparent px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="glass-panel relative w-full max-w-xl rounded-3xl p-8 shadow-2xl sm:p-10">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-semibold text-cyan-300">
            COMMUNITY & SUPPORT
          </span>
          <h1 className="font-sora text-3xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-2 font-sans text-xs text-slate-400">
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
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
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
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
              className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] p-3 font-sans text-xs text-white placeholder-slate-500 transition-all focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <FaPaperPlane className="text-xs" /> Send Message
          </button>

          {status && (
            <p className="mt-3 text-center font-mono text-xs font-medium text-cyan-300">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

