import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CreateIcon from "@mui/icons-material/Create";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Sidemenu = () => {
  const { t } = useTranslation();

  const menu = [
    {
      title: t("UI.SIDEMENU.my-pets"),
      icon: <PetsIcon />,
      to: "/app/pets",
    },
    {
      title: t("UI.SIDEMENU.calendar"),
      icon: <CalendarMonthIcon />,
      to: "/app/calendar",
    },
    {
      title: t("UI.SIDEMENU.my-agenda"),
      icon: <CreateIcon />,
      to: "/app/agenda",
    },
  ];

  return (
    <nav className="sidemenu-height sticky top-[56px] z-20 h-screen w-[250px] bg-slate-300 shadow-xl text-slate-900 dark:bg-slate-700">
      <ul>
        {menu.map(({ title, icon, to }, index) => {
          return (
            <NavLink
              key={index}
              className={({ isActive }) =>
                isActive ? "menu__item--active" : "menu__item"
              }
              to={to}
            >
              {icon}
              <span>{title}</span>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
};
