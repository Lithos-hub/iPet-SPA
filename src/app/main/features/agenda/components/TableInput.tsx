import { FC, InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  category: string;
  onChange: React.ChangeEventHandler;
}

export const TableInput: FC<Props> = ({
  category,
  onChange,

  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <input
      {...rest}
      className={`w-full p-4 shadow-xl rounded focus:outline-none border ${
        rest.disabled && "disabled"
      }`}
      placeholder={
        t(
          `AGENDA.${category.toUpperCase()}.${rest.placeholder}_placeholder`
        ) as string
      }
      onChange={onChange}
    />
  );
};
