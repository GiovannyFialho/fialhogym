import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@/hooks/useAuth";

import { Loading } from "@/components/loading";
import { Box } from "@/components/ui/box";

import { AppRoutes } from "@/routes/app.routes";
import { AuthRoutes } from "@/routes/auth.routes";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = "#121214";

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box className="flex-1">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
