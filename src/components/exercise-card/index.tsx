import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

type ExerciseCardProps = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack className="mb-3 items-center rounded-md bg-defaultGray p-2 pr-4">
        <Image
          source={{
            uri: "https://static.wixstatic.com/media/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp/v1/fill/w_350,h_375,al_c/2edbed_60c206e178ad4eb3801f4f47fc6523df~mv2.webp",
          }}
          width={64}
          height={64}
          className="mr-4 rounded-md object-cover"
          alt="Imagem do exercício"
        />

        <VStack className="flex-1">
          <Heading className="text-lg font-bold text-white">
            Puxada frontal
          </Heading>

          <Text
            className="mt-1 text-sm font-normal text-gray-200"
            numberOfLines={2}
          >
            3 séries x 12 repetições hdiuas iaud iahuda isud asiud aid aiuda
            isud aisud aiushdai usd aiusd iaushd aius daisu diaushdi aus
            daiusdai sudhai suhd aisuh disuah diaus hiuds
          </Text>
        </VStack>

        <Icon as={ChevronRight} className="color-gray-300" />
      </HStack>
    </TouchableOpacity>
  );
}
