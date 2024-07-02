import React from "react";

type InputProps = {
  id: string;
  label?: string;
  value?: string | number;
  type?: "number" | "url";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="relative mb-4">
      {label && (
        <label htmlFor={id} className="leading-7 text-sm text-gray-600">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
