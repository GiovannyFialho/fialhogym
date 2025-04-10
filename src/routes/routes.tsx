import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "@/routes/auth.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
