import React from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutIcon from "@mui/icons-material/Logout";

import { Divider, Menu, MenuItem, MenuProps, styled } from "@mui/material";

import { Button } from "@/components/Button";
import { LanguageMenu } from "@/components/LanguageMenu";

import { User } from "@/models/interfaces/User";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import { GradientIcon } from "@/components/GradientIcon";
import { useGetUserQuery } from "@/services/apis";

export const Navbar = () => {
  // RTK
  const { data: user } = useGetUserQuery();

  // Account menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Methods
  const logout = () => {
    localStorage.clear();
    location.reload();
  };

  // Styled menu
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "0",
      },
    },
  }));

  return (
    <nav className="bg-primary p-2 px-5 text-white w-full flex justify-between shadow-lg">
      <Link className="flex gap-2 items-center" to="/app/home">
        <h2>iPet</h2>
        <PetsIcon />
      </Link>
      <div className="flex gap-5 items-center">
        {/* <IconButton aria-label="show notifications" color="primary">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <LanguageMenu />
        <Button
          icon={<LogoutIcon />}
          variant="icon_transparent"
          onClick={logout}
        />
        <Button
          icon={<AccountCircleIcon />}
          variant="icon_transparent"
          onClick={handleClick}
        />
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ py: 0 }}
        >
          <div className="p-3 bg-primary text-white text-center m-0">
            <strong>{(user as User).email}</strong>
          </div>
          <Link to="/app/user/settings">
            <MenuItem onClick={handleClose} sx={{ py: 2 }}>
              <GradientIcon>
                <SettingsIcon
                  className="mr-5"
                  sx={{ fill: "url(#linearColors)" }}
                />
              </GradientIcon>
              <span className="text__primary--gradient">Account settings</span>
            </MenuItem>
          </Link>
        </StyledMenu>
      </div>
    </nav>
  );
};
