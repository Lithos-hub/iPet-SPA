import { Route, Routes } from "react-router-dom";

import AuthRoutes from "../auth/routes/AuthRoutes";
import MainRoutes from "../main/routes/MainRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<AuthRoutes />} />
      <Route path="/app/*" element={<MainRoutes />} />
    </Routes>
  );
};
