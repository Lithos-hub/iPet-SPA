import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export const RadioBox: FC<Props> = ({ ...props }) => {
  return (
    <>
      <label
        className={`appearance-none inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 
        bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-pink-100 duration-200 dark:text-slate-900 ${
          props.checked && "bg-primary text-white"
        }`}
      >
        <input {...props} type="radio" className="hidden peer" />
        <div className="block">
          <div className="w-full text-lg font-semibold">{props.title}</div>
        </div>
      </label>
    </>
  );
};
