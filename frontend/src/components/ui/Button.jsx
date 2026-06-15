
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary'
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyle = 'inline-flex items-center justify-center font-sans text-xs font-medium uppercase tracking-[0.1em] py-3.5 px-8 transition-colors duration-500 rounded-md focus:outline-none focus:ring-1 focus:ring-antique-gold';
  
  const variants = {
    primary: 'bg-bitter-chocolate text-warm-cream hover:bg-antique-gold border border-transparent',
    secondary: 'border border-bitter-chocolate text-bitter-chocolate bg-transparent hover:bg-bitter-chocolate hover:text-warm-cream',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
