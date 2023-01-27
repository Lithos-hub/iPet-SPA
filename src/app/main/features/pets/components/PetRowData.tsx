interface Props {
  title: string;
  data: any;
  icon: string;
}

export const PetRowData = ({ title, data, icon }: Props) => {
  return (
    <div className="z-20 bg-white rounded-xl p-5 shadow-lg text-black text-center relative">
      <img
        src={`/3d-icons/${icon}.png`}
        className="max-h-[70px] absolute -top-[35px] right-0 z-20"
      />
      <h3 className="text__secondary--gradient">{title}</h3>
      <p className="font-bold mt-2 text-pink-500">{data}</p>
    </div>
  );
};
