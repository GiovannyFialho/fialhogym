import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export function HistoryCard() {
  return (
    <HStack className="mb-3 w-full items-center justify-between rounded-md bg-darkGray px-5 py-4">
      <VStack className="mr-5">
        <Heading className="text-base font-bold capitalize text-white">
          Costas
        </Heading>

        <Text className="text-lg text-gray-100" numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>

      <Text className="text-base text-gray-400">08:56</Text>
    </HStack>
  );
}
