import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export function HomeHeader() {
  return (
    <HStack>
      <VStack>
        <Text className="text-sm text-gray-100">Olá, </Text>
        <Heading className="text-base text-gray-100">Giovanny Fialho</Heading>
      </VStack>
    </HStack>
  );
}
