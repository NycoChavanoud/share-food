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

//OK AVEC PIERRE
interface IContextProviderProps {
  children: React.ReactNode;
}

//OK AVEC PIERRE
interface CurrentUserContextValue {
  currentUserProfile: IUser | null;
}

//OK AVEC PIERRE
const CurrentUserContext = createContext<CurrentUserContextValue>({
  currentUserProfile: null,
});

//TEST 1
//const CurrentUserContext = createContext({} as CurrentUserContextValue);

//TEST2
//const CurrentUserContext = createContext<string | undefined>(undefined);

//TEST3
// function createCtx<A extends {} | null>() {
//   const ctx = createContext<A | undefined>(undefined);
//   function useCtx() {
//     const c = useContext(ctx);
//     if (c === undefined)
//       throw new Error("useCtx must be inside a Provider with a value");
//     return c;
//   }
//   return [useCtx, ctx.Provider] as const;
// }

// export const [useCurrentUserName, CurrentUserProvider] = createCtx<string>();

//OK AVEC PIERRE
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

  return (
    <CurrentUserContext.Provider value={{ currentUserProfile }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContext;
