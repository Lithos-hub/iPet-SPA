import { ButtonVariant } from "../types/ButtonVariant";
import PropTypes from "prop-types";

interface Props {
  variant: ButtonVariant;
  icon?: any;
  title?: string;
  size?: "small" | "standard" | "big";
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export const Button = ({
  title,
  variant,
  size = "standard",
  type = "button",
  icon,
  onClick,
  disabled = false,
}: Props) => {
  const buttonSize = {
    small: "btn__small",
    standard: "btn__standard",
    big: "btn__big",
  };
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`relative ${
        (variant === "primary" && "btn__primary") ||
        (variant === "secondary" && "btn__secondary") ||
        (variant === "tertiary" && "btn__tertiary") ||
        (variant === "danger" && "btn__danger") ||
        (variant === "icon" && "btn__icon") ||
        (variant === "disabled" && "btn__disabled") ||
        (variant === "icon_transparent" && "btn__icon--transparent")
      } ${buttonSize[size as keyof typeof buttonSize]}`}
    >
      {title ? (
        <span>{title}</span>
      ) : (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
    </button>
  );
};

// Button.propTypes = {
//   title: PropTypes.string,
//   variant: PropTypes.string.isRequired,
// };
