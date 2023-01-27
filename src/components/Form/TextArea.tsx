import { useState } from "react";

import { InputLayout } from "@/components/Form/InputLayout";

interface Props {
  label: string;
  placeholder: string;
  variant?: string;
  bordered?: boolean;
  name: string;
  onChange: any;
  value: string;
}

export const TextArea = ({
  label,
  placeholder,
  variant,
  bordered = false,
  name,
  onChange,
  value,
}: Props) => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        className={`font-medium mr-auto p-2 ${
          (variant === "primary" && "text__primary") ||
          (variant === "secondary" && "text__secondary") ||
          (variant === "tertiary" && "text__tertiary")
        }`}
      >
        {label}
      </label>
      <InputLayout isOnFocus={focus}>
        <textarea
          name={name}
          className={`p-3 w-full h-full shadow-xl rounded focus:outline-none ${
            bordered && "border border-slate-400"
          }`}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
        />
      </InputLayout>
    </div>
  );
};
