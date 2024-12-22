import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function AuthButton({ children, isLoading, className, ...props }: AuthButtonProps) {
  return (
    <button
      className={clsx(
        "w-full flex justify-center py-2 px-4 border border-transparent rounded-md",
        "shadow-sm text-sm font-medium text-white bg-indigo-600",
        "hover:bg-indigo-700 focus:outline-none focus:ring-2",
        "focus:ring-offset-2 focus:ring-indigo-500",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}