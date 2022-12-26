import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({
    logged: false,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
