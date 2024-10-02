import { forwardRef } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", placeholder, value, onChange, className, ...props },
    ref
  ) => {
    return (
      <div>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className={`input ${className}`}
        />
      </div>
    );
  }
);
