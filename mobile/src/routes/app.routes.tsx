import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { AppTabRoutes } from "@/routes/app.tab.routes";
import { Exercise } from "@/screens/exercise";

type RootStackRoutes = {
  tabs: undefined;
  exercise: { exerciseId: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="tabs" component={AppTabRoutes} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
