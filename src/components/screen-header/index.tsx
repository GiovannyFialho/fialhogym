import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";

interface ScreenHeaderProps {
  title: string;
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return (
    <VStack className="items-center justify-center bg-darkGray pb-8 pt-28">
      <Heading className="text-xl font-bold text-gray-100">{title}</Heading>
    </VStack>
  );
}
