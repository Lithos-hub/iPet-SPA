import { FC } from "react";

const colors = [
  "bg-neutral-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-teal-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-rose-500",
];

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  activeColor: string;
  onColorClick: (color: string) => void;
}

export const ColorPicker: FC<Props> = ({
  activeColor,
  onColorClick,
  ...rest
}: Props) => {
  return (
    <div className="grid grid-cols-6 gap-5 items-center justify-center w-full mt-5 shadow-xl p-5 rounded-xl dark:bg-slate-900">
      {colors.map((color, index) => (
        <div key={index} className="mx-auto">
          <input
            {...rest}
            id="hosting-color"
            type="radio"
            className="hidden"
            value={color}
          />
          <div
            className={`${color} h-[50px] w-[50px] p-3 rounded-full 
        shadow-xl cursor-pointer hover:scale-105 hover:brightness-125 duration-100 
        ${activeColor === color ? "border-2 border-slate-900" : ""}`}
            onClick={() => onColorClick(color)}
          />
        </div>
      ))}
    </div>
  );
};
