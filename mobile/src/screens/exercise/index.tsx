import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { ExerciseDTO } from "@/dtos/exercise-dto";
import { type NavigationProps } from "@/routes/app.routes";
import { api } from "@/service/api";
import { AppError } from "@/utils/app-error";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { ToastMessage } from "@/components/toast-message";

import BodySvg from "@/assets/body.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import SeriesSvg from "@/assets/series.svg";

type RoutesParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RoutesParamsProps;

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetail() {
    try {
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  useEffect(() => {
    fetchExerciseDetail();
  }, [exerciseId]);

  return (
    <VStack className="flex-1">
      <VStack className="bg-darkGray px-8 pt-14">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} className="color-green-500" size="xl" />
        </TouchableOpacity>

        <HStack className="mt-4 items-center justify-between pb-8">
          <Heading className="shrink text-lg font-bold text-gray-100">
            {exercise.name}
          </Heading>

          <HStack className="items-center">
            <BodySvg />

            <Text className="ml-1 capitalize text-gray-200">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack className="p-8">
          <Box className="mb-3 overflow-hidden rounded-lg">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Exercicio"
              className="h-80 w-full object-cover"
            />
          </Box>

          <Box className="rounded-md bg-darkGray px-4 pb-4">
            <HStack className="mb-6 mt-5 items-center justify-around">
              <HStack>
                <SeriesSvg />
                <Text className="ml-2 text-gray-200">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text className="ml-2 text-gray-200">
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
