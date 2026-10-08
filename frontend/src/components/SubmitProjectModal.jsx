import React, { useState } from 'react';
import api from './api';
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaBuilding,
  FaProjectDiagram,
  FaFileAlt,
  FaGithub,
  FaFilePdf,
  FaImage,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaSpinner,
} from 'react-icons/fa';

const SubmitProjectModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollno: '',
    department: '',
    title: '',
    description: '',
    github: '',
    projectUrl: '',
    pdf: null,
    image: null,
    toolsUsed: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      rollno: '',
      department: '',
      title: '',
      description: '',
      github: '',
      projectUrl: '',
      pdf: null,
      image: null,
      toolsUsed: '',
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      const file = files[0];
      if (name === 'pdf' && file.type !== 'application/pdf') {
        setSubmitMessage('Please upload a valid PDF file.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      if (name === 'image' && !file.type.startsWith('image/')) {
        setSubmitMessage('Please upload a valid image file.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setSubmitMessage('File size must be under 5MB.');
        setTimeout(() => setSubmitMessage(''), 3000);
        return;
      }
      setForm((prev) => ({ ...prev, [name]: file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('Uploading project files...');

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null || key === 'toolsUsed' || key === 'projectUrl') {
        formData.append(key, value || '');
      }
    });

    try {
      const response = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitMessage('Project uploaded successfully!');

      setTimeout(() => {
        resetForm();
        setIsSubmitting(false);
        setSubmitMessage('');
        if (response.data && response.data.project) {
          onSubmit(response.data.project);
        } else {
          onSubmit();
        }
        onClose();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.details ||
        err.response?.data?.message ||
        err.message ||
        'Unknown error';
      setSubmitMessage(`Upload failed: ${errorMessage}`);
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/85 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-2xl sm:p-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
              SUBMISSION FORM
            </div>
            <h2 className="font-sora text-xl font-bold text-white sm:text-2xl">Submit New Project</h2>
            <p className="mt-0.5 font-sans text-xs text-slate-400">
              Share your innovation with the university showcase community
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Status Message */}
        {submitMessage && (
          <div
            className={`mt-4 rounded-xl p-3 font-sans text-xs font-medium ${
              submitMessage.includes('successfully')
                ? 'border border-emerald-500/40 bg-emerald-950/60 text-emerald-300'
                : 'border border-rose-500/40 bg-rose-950/60 text-rose-300'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Author Details Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Author Name</label>
              <div className="relative">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Full name"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaUser className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Email Address</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="rollno@adityauniversity.in"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaEnvelope className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Roll Number</label>
              <div className="relative">
                <input
                  name="rollno"
                  value={form.rollno}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 24M11MC150"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaIdBadge className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Department</label>
              <div className="relative">
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                  placeholder="e.g. CSE, EEE, AI&ML"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaBuilding className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>
          </div>

          {/* Project Title */}
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Project Title</label>
            <div className="relative">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Name of your project"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaProjectDiagram className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">Description</label>
            <div className="relative">
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Explain the problem statement, approach, and outcome..."
                disabled={isSubmitting}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaFileAlt className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
                GitHub Repository URL
              </label>
              <div className="relative">
                <input
                  name="github"
                  type="url"
                  value={form.github}
                  onChange={handleChange}
                  required
                  placeholder="https://github.com/..."
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaGithub className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
                Live Demo URL (Optional)
              </label>
              <div className="relative">
                <input
                  name="projectUrl"
                  type="url"
                  value={form.projectUrl}
                  onChange={handleChange}
                  placeholder="https://myproject.com"
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
                />
                <FaExternalLinkAlt className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
              Tools & Technologies (Comma-separated)
            </label>
            <div className="relative">
              <input
                name="toolsUsed"
                value={form.toolsUsed}
                onChange={handleChange}
                placeholder="React, Node.js, PyTorch, LoRaWAN"
                disabled={isSubmitting}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-9 pr-3 font-sans text-xs text-white placeholder-slate-500 focus:border-cyan-500/50 focus:bg-white/[0.06] focus:outline-none"
              />
              <FaProjectDiagram className="absolute left-3 top-2.5 text-xs text-slate-500" />
            </div>
          </div>

          {/* File Uploads Row */}
          <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
                Documentation PDF (Max 5MB)
              </label>
              <div className="relative">
                <input
                  name="pdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-1.5 pl-9 pr-2 font-sans text-xs text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-cyan-200 hover:file:bg-cyan-500/30"
                />
                <FaFilePdf className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>

            <div>
              <label className="mb-1 block font-sans text-xs font-medium text-slate-300">
                Project Image / Poster (Max 5MB)
              </label>
              <div className="relative">
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-1.5 pl-9 pr-2 font-sans text-xs text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-2.5 file:py-1 file:text-xs file:font-semibold file:text-cyan-200 hover:file:bg-cyan-500/30"
                />
                <FaImage className="absolute left-3 top-2.5 text-xs text-slate-500" />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-sans text-xs font-semibold text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-sans text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin text-xs" /> Uploading...
                </>
              ) : (
                <>
                  <FaCheck className="text-xs" /> Submit Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProjectModal;

