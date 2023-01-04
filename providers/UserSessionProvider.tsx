import { useContext, createContext, ReactNode } from "react";
import { useMentorProfile } from "../hooks/queries/mentor";
import { useSession } from "../hooks/useSession";
import { Mentor } from "../types/mentor";

interface LoggedUserMentorProfileContext {
  mentorData?: Mentor;
}

const LoggedUserMentorProfileContext =
  createContext<LoggedUserMentorProfileContext>({
    mentorData: undefined,
  });

interface LoggedUserMentorProfileProviderProps {
  children?: ReactNode;
}

export function LoggedUserMentorProfileProvider({
  children,
}: LoggedUserMentorProfileProviderProps) {
  const { data: session } = useSession();
  const { data: mentorData } = useMentorProfile(session?.user.id || "", {
    enabled: Boolean(session?.user),
  });

  return (
    <LoggedUserMentorProfileContext.Provider value={{ mentorData }}>
      {children}
    </LoggedUserMentorProfileContext.Provider>
  );
}

export function useLoggedUserMentorProfile() {
  return useContext(LoggedUserMentorProfileContext);
}
