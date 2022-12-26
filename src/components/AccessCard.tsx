import { Button } from "./Button";

export const AccessCard = ({ title, type, children }: any) => {
  return (
    <div className="bg-[#202020] rounded-xl shadow-lg w-full">
      <header className="p-5 text-white bg-primary rounded-t-xl">
        <h3 className="text-center">{title}</h3>
      </header>
      <main className="p-5">{children}</main>
      <footer className="p-5 text-center">
        <Button title="Submit" variant="primary" />
      </footer>
    </div>
  );
};
