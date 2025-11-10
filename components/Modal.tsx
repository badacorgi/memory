import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md text-center border border-slate-700 animate-scale-in">
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">{title}</h2>
        <div className="text-slate-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
