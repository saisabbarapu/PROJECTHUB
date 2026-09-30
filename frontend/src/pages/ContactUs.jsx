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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            Get In Touch
          </span>
          <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-2 text-xs text-slate-400">
            Have questions or project feedback? Send us a message directly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-medium text-slate-300">
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
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <FaUser className="absolute left-3 top-3 text-xs text-slate-400" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-medium text-slate-300">
              Your Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <FaEnvelope className="absolute left-3 top-3 text-xs text-slate-400" />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-xs font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/90 p-3 text-xs text-white placeholder-slate-500 transition-all focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-600 hover:to-purple-700"
          >
            <FaPaperPlane className="text-xs" /> Send Message
          </button>

          {status && (
            <p className="mt-3 text-center text-xs font-medium text-indigo-400">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
