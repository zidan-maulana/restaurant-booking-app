
export default function Card({
  children,
  className = '',
  ...props
}) {
  return (
    <div
      className={`bg-warm-cream-dark/30 border border-bitter-chocolate/10 rounded-xl p-6 transition-all duration-300 hover:border-bitter-chocolate/20 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
