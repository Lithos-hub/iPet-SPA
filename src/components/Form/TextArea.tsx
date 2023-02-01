import { useState } from "react";

import { InputLayout } from "@/components/Form/InputLayout";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  variant?: string;
  bordered?: boolean;
}

export const TextArea = ({
  label,
  variant,
  bordered = false,
  ...rest
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
          {...rest}
          className={`p-3 w-full h-full shadow-xl rounded focus:outline-none ${
            bordered && "border border-slate-400"
          }`}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      </InputLayout>
    </div>
  );
};
