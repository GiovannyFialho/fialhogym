import { LogOut } from "lucide-react-native";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { UserPhoto } from "@/components/user-photo";

export function HomeHeader() {
  return (
    <HStack className="bg-darkGray items-center gap-4 px-8 pb-5 pt-16">
      <UserPhoto
        source={{ uri: "https://github.com/GiovannyFialho.png" }}
        width={16}
        height={16}
        alt="Imagem do usuário"
      />

      <VStack className="flex-1">
        <Text className="text-sm text-gray-100">Olá, </Text>
        <Heading className="text-base text-gray-100">Giovanny Fialho</Heading>
      </VStack>

      <Icon as={LogOut} className="color-gray-200" size="xl" />
    </HStack>
  );
}
