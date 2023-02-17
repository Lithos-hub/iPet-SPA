export const InputLayout = ({ children, isOnFocus }: any) => {
  return (
    <>
      <div
        className={`h-auto w-full relative rounded p-[3px] ${
          isOnFocus ? "bg-primary__motion" : "bg-primary__static"
        }`}
      >
        {children}
      </div>
    </>
  );
};
