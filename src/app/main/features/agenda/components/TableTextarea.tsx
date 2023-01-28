import { FC, InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  category: string;
  onChange: React.ChangeEventHandler;
}

export const TableTextarea: FC<Props> = ({
  category,
  onChange,

  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <textarea
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
