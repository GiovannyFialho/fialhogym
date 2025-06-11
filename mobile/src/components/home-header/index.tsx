import { LogOut } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/service/api";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { UserPhoto } from "@/components/user-photo";

import userPhotoDefault from "@/assets/userPhotoDefault.png";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <HStack className="items-center gap-4 bg-darkGray px-8 pb-5 pt-16">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : userPhotoDefault
        }
        width={16}
        height={16}
        alt="Imagem do usuário"
      />

      <VStack className="flex-1">
        <Text className="text-sm text-gray-100">Olá, </Text>
        <Heading className="text-base text-gray-100">{user.name}</Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={LogOut} className="color-gray-200" size="xl" />
      </TouchableOpacity>
    </HStack>
  );
}
