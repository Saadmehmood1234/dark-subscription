import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: { message?: string };
  icon?: ReactNode;
}

export const Input = ({ label, error, icon, ...props }: InputProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-foreground">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
      )}
      <input
        className={`w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground hover:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 ${
          icon ? "pl-10" : ""
        }`}
        {...props}
      />
    </div>
    {error?.message && (
      <p className="mt-1 text-sm font-medium text-destructive">{error.message}</p>
    )}
  </div>
);
