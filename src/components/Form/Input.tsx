import { useState } from "react";

import { InputLayout } from "@/components/Form/InputLayout";
import { Button } from "@/components/Button";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: string;
  bordered?: boolean;
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
  variant,
  hasError,
  errorMessage,
  icon,
  onIconClick,
  ...rest
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
            {...rest}
            className={`${hasError && "bg-red-100"}
          w-full p-4 shadow-xl rounded focus:outline-none bg-white`}
            placeholder={placeholder}
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
