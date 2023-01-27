import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../features/home/HomePage";
import { PetsPage } from "../features/pets/PetsPage";
import { CalendarPage } from "../features/calendar/CalendarPage";
import { AgendaPage } from "../features/agenda/AgendaPage";
import { PetDetailsPage } from "../features/pets/PetDetailsPage";

import Error404 from "@/app/error404";

export default function MainRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/pets"
        element={
          <MainLayout>
            <PetsPage />
          </MainLayout>
        }
      />
      <Route
        path="/pet/:id"
        element={
          <MainLayout>
            <PetDetailsPage />
          </MainLayout>
        }
      />
      <Route
        path="/calendar"
        element={
          <MainLayout>
            <CalendarPage />
          </MainLayout>
        }
      />
      <Route path="/agenda" element={<Navigate to="/app/agenda/vets" />} />
      <Route
        path="/agenda/*"
        element={
          <MainLayout>
            <AgendaPage />
          </MainLayout>
        }
      />
      <Route path="/*" element={<Navigate to="/app/home" />} />
    </Routes>
  );
}
