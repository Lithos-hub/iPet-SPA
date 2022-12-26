interface Props {
  label: string;
  placeholder: string;
  type: string;
}

export const Input = ({ label, placeholder, type }: Props) => {
  return (
    <div className="flex flex-col">
      <label className="mr-auto p-2 text__primary">{label}</label>
      <input
        className="p-3 shadow-xl rounded focus:outline-none"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
