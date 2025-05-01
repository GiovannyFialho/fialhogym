import { ScrollView, TouchableOpacity } from "react-native";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
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

          <TouchableOpacity>
            <Text className="mb-8 mt-2 text-base font-bold text-green-500">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Box className="w-full gap-4">
            <Input placeholder="Nome" className="bg-darkGray" />

            <Input
              value="giovanny@email.com"
              className="bg-darkGray"
              isReadOnly
            />
          </Box>

          <Heading className="mb-2 mt-12 self-start text-base font-bold text-gray-200">
            Alterar senha
          </Heading>

          <Box className="w-full gap-4">
            <Input
              secureTextEntry
              placeholder="Senha antiga"
              className="bg-darkGray"
            />

            <Input
              secureTextEntry
              placeholder="Nova senha"
              className="bg-darkGray"
            />

            <Input
              secureTextEntry
              placeholder="Confirme a nova senha"
              className="bg-darkGray"
            />

            <Button title="Atualizar" />
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
}
