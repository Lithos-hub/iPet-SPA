import PetsIcon from "@mui/icons-material/Pets";
import { Link } from "react-router-dom";

export const AuthNavbar = ({ children }: any) => {
  return (
    <nav className="fixed top-0 left-0 w-full p-10 flex justify-between z-30">
      <Link
        to="/"
        className="flex gap-2 items-center hover:scale-125 w-[70px] overflow-hidden hover:w-[120px] hover:ml-[10px] duration-500"
      >
        <h1>iPet</h1>
        <PetsIcon />
      </Link>
      {children}
    </nav>
  );
};
