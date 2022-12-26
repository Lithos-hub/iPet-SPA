export const Button = ({
  title,
  variant,
  size = "standard",
}: {
  title: string;
  variant: "primary" | "secondary" | "tertiary";
  size?: "small" | "standard" | "big";
}) => {
  const buttonSize = {
    small: "btn__small",
    standard: "btn__standard",
    big: "btn__big",
  };
  return (
    <button
      className={`${
        (variant === "primary" && "btn__primary") ||
        (variant === "secondary" && "btn__secondary") ||
        (variant === "tertiary" && "btn__tertiary")
      } ${buttonSize[size as keyof typeof buttonSize]}`}
    >
      {title}
    </button>
  );
};
