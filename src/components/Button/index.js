const Button = ({ children, className = '', variant = 'default', ...rest }) => {
  const base = 'flex items-center justify-center px-5 py-2 space-x-3 rounded disabled:opacity-75';
  const variants = {
    default: 'bg-gray-100 hover:bg-gray-50 text-text-primary',
    primary: 'bg-brand-orange hover:opacity-90 text-white',
    secondary: 'bg-brand-blue hover:opacity-90 text-white',
    outline: 'border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
  };
  const variantClass = variants[variant] || variants.default;
  return (
    <button className={`${base} ${variantClass} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
