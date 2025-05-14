import { Routes } from "@/routes/routes";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

import "../global.css";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { Loading } from "@/components/loading";

export function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <GluestackUIProvider mode="dark">
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          {fontsLoaded ? <Routes /> : <Loading />}
        </GluestackUIProvider>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
