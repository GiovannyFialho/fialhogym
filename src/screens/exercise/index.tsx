import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { type NavigationProps } from "@/routes/app.routes";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import BodySvg from "@/assets/body.svg";

export function Exercise() {
  const navigation = useNavigation<NavigationProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack className="flex-1">
      <VStack className="bg-darkGray px-8 pt-14">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} className="color-green-500" size="xl" />
        </TouchableOpacity>

        <HStack className="mt-4 items-center justify-between pb-8">
          <Heading className="shrink text-lg font-bold text-gray-100">
            Puxada frontal
          </Heading>

          <HStack className="items-center">
            <BodySvg />

            <Text className="ml-1 capitalize text-gray-200">Costas</Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  );
}
