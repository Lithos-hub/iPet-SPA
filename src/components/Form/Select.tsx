import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InputLayout } from "@/components/Form/InputLayout";

interface Props {
  data: any;
  label: string;
  placeholder: string;
  variant?: string;
  bordered?: boolean;
  name: string;
  value: string | number;
  onChange: React.ChangeEventHandler;
  onBlur: React.FocusEventHandler;
  hasError?: boolean;
  errorMessage?: string;
}

export const Select = ({
  data,
  label,
  placeholder,
  variant,
  bordered = false,
  name,
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage,
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex flex-col flex-1 relative">
      <label
        className={`font-medium mr-auto p-2 text-black dark:text-white ${
          (variant === "primary" && "text__primary") ||
          (variant === "secondary" && "text__secondary") ||
          (variant === "tertiary" && "text__tertiary")
        }`}
      >
        {label}
      </label>
      <InputLayout isOnFocus={focus} hasError={hasError}>
        <select
          className={`${bordered && "border border-slate-400"} ${
            hasError && "border-2 border-red-500 bg-red-100"
          }
          w-full p-4 shadow-xl rounded focus:outline-none min-w-[100px]`}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
        >
          {data.map(
            (
              { text, value }: { text: string; value: string },
              index: number
            ) => (
              <option key={index} value={value}>
                {text}
              </option>
            )
          )}
        </select>
        <div className="absolute top-8 right-3 -translate-y-1/2">
          <ExpandMoreIcon />
        </div>
      </InputLayout>

      {hasError && (
        <small className="text-red-500 dark:text-red-400 pt-1">
          {errorMessage}
        </small>
      )}
    </div>
  );
};
