import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthRoutes from "../auth/routes/AuthRoutes";
import MainRoutes from "../main/routes/MainRoutes";

import { Loader } from "@/components/Spinner/Spinner";

import { useGetUserQuery, useSessionMutation } from "@/services/apis";
import { setUser } from "@/store/slices/userSlice";

import { User } from "@/models/interfaces/User";

interface SessionData {
  data: {
    user: User;
    token: string;
  };
}

export const AppRouter = () => {
  // RTK
  const { data: user, isLoading } = useGetUserQuery();

  const dispatch = useDispatch();

  const [session] = useSessionMutation();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { user, token },
      }: SessionData = (await session(null)) as SessionData;
      localStorage.setItem("token", token);
      dispatch(setUser(user));
    };
    getSession();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          {user ? (
            <>
              <Route path="*" element={<Navigate to="/app/home" />} />
              <Route path="/app/*" element={<MainRoutes />} />
            </>
          ) : (
            <>
              <Route path="/app/*" element={<Navigate to="/" />} />
              <Route path="/*" element={<AuthRoutes />} />
            </>
          )}
        </Routes>
      )}
    </>
  );
};
