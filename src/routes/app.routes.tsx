import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import HistorySvg from "@/assets/history.svg";
import HomeSvg from "@/assets/home.svg";
import ProfileSvg from "@/assets/profile.svg";

import { History } from "@/screens/history";
import { Home } from "@/screens/home";
import { Profile } from "@/screens/profile";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const iconSize = 24;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00B37E",
        tabBarInactiveTintColor: "#C4C4CC",
        tabBarStyle: {
          height: Platform.OS === "android" ? "auto" : 96,
          paddingTop: 15,
          paddingBottom: 40,
          borderTopWidth: 0,
          backgroundColor: "#202024",
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
}
