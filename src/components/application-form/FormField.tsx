import React from 'react';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

export const FormField = ({ label, children, required }: FormFieldProps) => (
  <div className="mb-4">
    <label className="form-label">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    {children}
  </div>
);

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export const YesNoRadio = ({ label, name, value, onChange, required }: RadioGroupProps) => (
  <div className="mb-4">
    <span className="form-label">
      {label} {required && <span className="text-destructive">*</span>}
    </span>
    <div className="flex flex-wrap gap-4 mt-1">
      {['Yes', 'No'].map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm whitespace-nowrap">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="w-4 h-4 accent-primary"
          />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

interface ConditionalDetailsProps {
  show: boolean;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const ConditionalDetails = ({ show, label = 'If yes, please provide details:', value, onChange, required }: ConditionalDetailsProps) => {
  if (!show) return null;
  return (
    <div className="mb-4 ml-4 pl-4 border-l-2 border-primary/20">
      <label className="form-label">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <textarea
        className="form-input min-h-[80px] resize-y"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
