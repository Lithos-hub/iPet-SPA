import { Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const AgendaTabs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (location.pathname.includes("/app/agenda/vets")) {
      setValue(0);
    } else if (location.pathname.includes("/app/agenda/contacts")) {
      setValue(1);
    } else if (location.pathname.includes("/app/agenda/notes")) {
      setValue(2);
    }
  }, []);
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label={t("AGENDA.vets")}
          onClick={() => navigate("/app/agenda/vets")}
        />
        <Tab
          label={t("AGENDA.contacts")}
          onClick={() => navigate("/app/agenda/contacts")}
        />
        <Tab
          label={t("AGENDA.notes")}
          onClick={() => navigate("/app/agenda/notes")}
        />
      </Tabs>
    </>
  );
};
