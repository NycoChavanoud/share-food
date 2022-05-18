import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { IUser } from "../models/user";

interface IContextProviderProps {
  children: React.ReactNode;
}
interface CurrentUserContextValue {
  currentUserProfile: IUser | null;

  setCurrentUserProfile: (profile: IUser | null) => void;
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUserProfile: null,
  setCurrentUserProfile: () => {},
});

export const CurrentUserContextProvider = ({
  children,
}: IContextProviderProps) => {
  const { status } = useSession();
  const [currentUserProfile, setCurrentUserProfile] = useState<IUser | null>(
    null
  );

  const getProfile = useCallback(() => {
    axios
      .get("/api/profile/me")
      .then(({ data }) => {
        setCurrentUserProfile(data);
      })
      .catch(() => {
        signOut();
      });
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      getProfile();
    } else if (status === "unauthenticated") {
      setCurrentUserProfile(null);
    }
  }, [status, getProfile]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUserProfile, setCurrentUserProfile }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
