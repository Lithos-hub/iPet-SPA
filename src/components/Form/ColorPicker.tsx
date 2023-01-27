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

type Props = {
  activeColor: string;
  onColorClick: Function;
};

export const ColorPicker = ({ activeColor, onColorClick }: Props) => {
  return (
    <ul className="grid grid-cols-12 justify-between w-full">
      {colors.map((color, index) => (
        <li
          key={index}
          onClick={() => onColorClick(color)}
          className={`${color} h-[45px] aspect-square p-5 rounded-full shadow-xl cursor-pointer hover:scale-105 hover:brightness-125 duration-200 ${
            activeColor === color ? "border-2 border-black" : ""
          }`}
        />
      ))}
    </ul>
  );
};
