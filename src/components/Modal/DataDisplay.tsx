export const DataDisplay = ({
  title,
  data,
}: {
  title: string;
  data: string;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xl p-5 min-w-[200px] max-w-[500px] flex flex-col">
      <h5 className="pb-5">{title}</h5>
      <div className="text-sm overflow-hidden overflow-y-auto max-h-[500px]">
        {data}
      </div>
    </div>
  );
};
