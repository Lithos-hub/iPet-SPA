import { Route, Routes } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { AgendaLayout } from "./layout/AgendaLayout";

import { AgendaTabs } from "@/components/AgendaTabs";

import { VetPage } from "./VetPage";
import { ContactsPage } from "./ContactsPage";
import { NotesPage } from "./NotesPage";

export const AgendaPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex justify-between items-center mb-5">
        <h2 className="text__primary--gradient">{t("AGENDA.title")}</h2>
      </header>
      <AgendaTabs />
      <main className="mt-5">
        <Routes>
          <Route
            path="/vets"
            element={
              <AgendaLayout>
                <VetPage />
              </AgendaLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <AgendaLayout>
                <ContactsPage />
              </AgendaLayout>
            }
          />
          <Route
            path="/notes"
            element={
              <AgendaLayout>
                <NotesPage />
              </AgendaLayout>
            }
          />
        </Routes>
      </main>
    </>
  );
};
