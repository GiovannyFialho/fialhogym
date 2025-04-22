import { VStack } from "@/components/ui/vstack";

import { HomeHeader } from "@/components/home-header";

export function Home() {
  return (
    <VStack className="bg-darkGray items-center px-8 pb-5 pt-16">
      <HomeHeader />
    </VStack>
  );
}
