
export default function Input({
  label,
  id,
  type = 'text',
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-wider text-bitter-chocolate/60 font-semibold"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className="w-full bg-warm-cream/50 border border-bitter-chocolate/20 px-3.5 py-2.5 text-bitter-chocolate font-sans text-sm rounded-md focus:border-antique-gold focus:outline-none focus:ring-1 focus:ring-antique-gold transition-all duration-300"
        {...props}
      />
    </div>
  );
}
