import { HistoryDTO } from "@/dtos/history-dto";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

type HistoryCardProps = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack className="mb-3 w-full items-center justify-between rounded-md bg-darkGray px-5 py-4">
      <VStack className="mr-5 flex-1">
        <Heading
          className="text-base font-bold capitalize text-white"
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text className="text-lg text-gray-100" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text className="text-base text-gray-400">{data.hour}</Text>
    </HStack>
  );
}
