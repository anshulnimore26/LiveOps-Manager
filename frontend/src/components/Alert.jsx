import { cn } from '../utils/cn';

export function Alert({ children, className, variant = 'default' }) {
  const baseClasses = 'p-4 rounded-md text-sm';
  
  const variants = {
    default: 'bg-blue-50 text-blue-800 border border-blue-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)}>
      {children}
    </div>
  );
}
