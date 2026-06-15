import { useEffect } from 'react';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  onConfirm,
  isDangerous = false,
  isLoading = false,
}) {
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-bitter-chocolate/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-warm-cream border border-antique-gold/30 rounded-xl max-w-md w-full p-6 sm:p-8 shadow-2xl animate-fade-in z-10 flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center sm:text-left">
          <h3 className="font-serif italic text-2xl text-bitter-chocolate mb-1">
            {title}
          </h3>
          <hr className="border-bitter-chocolate/10 my-3" />
        </div>

        {/* Content */}
        <div className="font-sans text-sm text-bitter-chocolate/70 leading-relaxed">
          {children}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto text-xs uppercase font-bold tracking-widest text-bitter-chocolate/60 hover:text-bitter-chocolate py-3 px-6 transition-colors duration-300 text-center cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`w-full sm:w-auto text-xs uppercase font-bold tracking-widest py-3 px-8 transition-colors duration-500 rounded-md cursor-pointer text-center ${
              isDangerous
                ? 'bg-terracotta-text text-warm-cream hover:bg-bitter-chocolate'
                : 'bg-bitter-chocolate text-warm-cream hover:bg-antique-gold'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Memproses...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
