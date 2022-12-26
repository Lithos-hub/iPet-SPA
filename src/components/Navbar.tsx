import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton } from "@mui/material";

export const Navbar = () => {
  return (
    <nav className="bg-primary p-2 px-5 text-white w-full absolute top-0 flex justify-between">
      <div className="flex gap-2 items-center">
        <h2>iPet</h2>
        <PetsIcon />
      </div>
      <div className="flex gap-5 items-center">
        {/* <IconButton aria-label="show notifications" color="primary">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <IconButton aria-label="show account menu items" color="primary">
          <AccountCircleIcon />
        </IconButton>
      </div>
    </nav>
  );
};
