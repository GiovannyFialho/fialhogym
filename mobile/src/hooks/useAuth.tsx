import { useContext } from "react";

import { AuthContext } from "@/contexts/auth-context";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
