import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar } from "react-native";

import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { Loading } from "@/components/loading";

import { SignUp } from "@/screens/sign-up";

export function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <GluestackUIProvider mode="dark">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <SignUp /> : <Loading />}
    </GluestackUIProvider>
  );
}
