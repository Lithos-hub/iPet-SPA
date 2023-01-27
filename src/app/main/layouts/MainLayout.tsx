import { Navbar } from "@/app/main/components/Navbar";
import { Sidemenu } from "@/app/main/components/Sidemenu";
import { AlertMessage } from "@/components/AlertMessage/AlertMessage";

export const MainLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col flex-grow w-full m-0 p-0">
      <div className="w-full sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex flex-1">
        <Sidemenu />

        <div className="flex-1 relative p-5">{children}</div>
      </main>
      <AlertMessage />
    </div>
  );
};
