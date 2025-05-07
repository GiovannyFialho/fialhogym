import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Box } from "@/components/ui/box";

// import { AppRoutes } from "@/routes/app.routes";
import { AuthRoutes } from "@/routes/auth.routes";

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = "#121214";

  return (
    <Box className="flex-1">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
