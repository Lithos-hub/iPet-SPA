import { useState } from "react";

import { InputLayout } from "@/components/Form/InputLayout";
import { Button } from "@/components/Button";

interface Props {
  label: string;
  placeholder: string;
  type: string;
  variant?: string;
  bordered?: boolean;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  hasError?: boolean;
  errorMessage?: string;
  icon?: JSX.Element;
  onIconClick?: React.MouseEventHandler;
}

export const Input = ({
  label,
  placeholder,
  type,
  variant,
  name,
  value,
  onChange,
  hasError,
  errorMessage,
  icon,
  onIconClick,
}: Props) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className="flex flex-col">
      <label
        className={`font-medium mr-auto p-2 text-black ${
          (variant === "primary" && "text__primary") ||
          (variant === "secondary" && "text__secondary") ||
          (variant === "tertiary" && "text__tertiary")
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <InputLayout isOnFocus={focus}>
          <input
            className={`${hasError && "bg-red-100"}
          w-full p-4 shadow-xl rounded focus:outline-none`}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
          />
        </InputLayout>
        {icon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 rounded-full">
            <Button
              variant="icon"
              icon={icon}
              onClick={onIconClick as React.MouseEventHandler}
            />
          </div>
        )}
      </div>
      {hasError && <small className="text-red-500 pt-1">{errorMessage}</small>}
    </div>
  );
};
