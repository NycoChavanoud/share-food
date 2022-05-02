import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../models/user";

interface IContextProviderProps {
  children: React.ReactNode;
}
interface CurrentUserContextValue {
  currentUserProfile: IUser | null;
}

const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUserProfile: null,
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
      .get("/api/profile")
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

  console.log(status);
  return (
    <CurrentUserContext.Provider value={{ currentUserProfile }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
