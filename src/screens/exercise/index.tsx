import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";

import { type NavigationProps } from "@/routes/app.routes";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";

import BodySvg from "@/assets/body.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import SeriesSvg from "@/assets/series.svg";

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack className="p-8">
          <Image
            source="https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp"
            alt="Exercicio"
            className="mb-3 h-80 w-full rounded-lg object-cover"
          />

          <Box className="rounded-md bg-darkGray px-4 pb-4">
            <HStack className="mb-6 mt-5 items-center justify-around">
              <HStack>
                <SeriesSvg />
                <Text className="ml-2 text-gray-200">3 séries</Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text className="ml-2 text-gray-200">12 repetições</Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
