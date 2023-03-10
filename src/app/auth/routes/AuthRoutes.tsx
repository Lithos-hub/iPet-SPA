import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { JoinPage } from "../pages/JoinPage";
import { ResetPage } from "../pages/ResetPage";
import { InitialPage } from "../pages/InitialPage";

import Error404 from "@/app/error404";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InitialPage />} />

      <Route path="login" element={<LoginPage />} />
      <Route path="join" element={<JoinPage />} />
      <Route path="reset" element={<ResetPage />} />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
