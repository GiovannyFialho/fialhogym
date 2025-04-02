import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { StatusBar, View } from "react-native";

import "@/global.css";
import { GluestackUIProvider } from "@ui-components/ui/gluestack-ui-provider";
import { Text } from "@ui-components/ui/text";

export function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <GluestackUIProvider mode="dark">
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#202020",
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Text size="6xl">Home</Text> : <View></View>}
      </View>
    </GluestackUIProvider>
  );
}
