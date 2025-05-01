import { ScrollView } from "react-native";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";

import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from "@/components/user-photo";

export function Profile() {
  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Box className="mt-6 items-center justify-center px-10">
          <UserPhoto
            source={{ uri: "https://github.com/GiovannyFialho.png" }}
            alt="Foto do usuário"
            size="lg"
          />
        </Box>
      </ScrollView>
    </VStack>
  );
}
