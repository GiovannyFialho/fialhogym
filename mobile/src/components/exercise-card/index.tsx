import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { ExerciseDTO } from "@/dtos/exercise-dto";
import { api } from "@/service/api";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack className="mb-3 items-center rounded-md bg-defaultGray p-2 pr-4">
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          width={64}
          height={64}
          className="mr-4 rounded-md object-cover"
          alt="Imagem do exercício"
        />

        <VStack className="flex-1">
          <Heading className="text-lg font-bold text-white">
            {data.name}
          </Heading>

          <Text
            className="mt-1 text-sm font-normal text-gray-200"
            numberOfLines={2}
          >
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} className="color-gray-300" />
      </HStack>
    </TouchableOpacity>
  );
}
