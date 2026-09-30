import React, { useContext } from 'react';
import { ToasterContext } from './ToasterContext';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toaster = ({ position = 'top-right-below-nav' }) => {
  const { toasts, removeToast } = useContext(ToasterContext);

  const positionClasses = {
    'top-right-below-nav': 'top-20 right-4 sm:right-6',
    'top-right': 'top-5 right-4 sm:right-6',
    'bottom-right': 'bottom-5 right-4 sm:right-6',
    'top-center': 'top-20 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
  };

  const typeConfig = {
    success: {
      style: 'bg-emerald-950/95 border-emerald-500/50 text-emerald-200 shadow-emerald-500/10',
      icon: <FaCheckCircle className="flex-shrink-0 text-sm text-emerald-400" />,
    },
    error: {
      style: 'bg-rose-950/95 border-rose-500/50 text-rose-200 shadow-rose-500/10',
      icon: <FaExclamationCircle className="flex-shrink-0 text-sm text-rose-400" />,
    },
    warning: {
      style: 'bg-amber-950/95 border-amber-500/50 text-amber-200 shadow-amber-500/10',
      icon: <FaExclamationCircle className="flex-shrink-0 text-sm text-amber-400" />,
    },
    info: {
      style: 'bg-slate-900/95 border-indigo-500/50 text-indigo-200 shadow-indigo-500/10',
      icon: <FaInfoCircle className="flex-shrink-0 text-sm text-indigo-400" />,
    },
  };

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className={`pointer-events-none fixed z-[9999] flex w-full max-w-sm px-3 sm:px-0 flex-col gap-2 transition-all duration-300 ${
        positionClasses[position] || positionClasses['top-right-below-nav']
      }`}
    >
      {toasts.map((toast) => {
        const config = typeConfig[toast.type] || typeConfig.info;
        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto flex animate-slide-up cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 text-xs font-medium shadow-2xl backdrop-blur-md transition-all hover:scale-[1.02] ${config.style}`}
          >
            <div className="flex items-center gap-2.5">
              {config.icon}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              className="p-1 opacity-70 transition-opacity hover:opacity-100"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toaster;
