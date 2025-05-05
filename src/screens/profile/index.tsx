import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ScreenHeader } from "@/components/screen-header";
import { UserPhoto } from "@/components/user-photo";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/GiovannyFialho.png",
  );

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return Alert.alert(
            "Essa imagem é muito grande, escolha uma de até 5MB",
          );
        }

        setUserPhoto(photoURI);
      }
    } catch (err) {
      console.log(`Error:: `, err);
    }
  }

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Box className="mt-6 items-center justify-center px-10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size="lg"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
