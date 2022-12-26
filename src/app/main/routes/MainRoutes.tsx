import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { PetPage } from "../pages/PetPage";
import { AboutPage } from "../pages/AboutPage";
import { Navbar } from "../../../components/Navbar";
import { Sidemenu } from "../../../components/Sidemenu";

export default function MainRoutes() {
  return (
    <>
      <Navbar />
      <Sidemenu />
      <Routes>
        <Route path="app/home" element={<HomePage />} />
        <Route path="app/about" element={<AboutPage />} />
        <Route path="app/pet" element={<PetPage />} />
        <Route path="app/search" element={<SearchPage />} />

        <Route path="/app/*" element={<Navigate to="home" />} />
      </Routes>
    </>
  );
}
