import { useState } from "react";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";

import { Group } from "@/components/group";
import { HomeHeader } from "@/components/home-header";

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <VStack>
      <HomeHeader />

      <HStack className="mt-10 gap-3 px-5">
        {["Costas", "Pernas", "Peito"].map((group) => (
          <Group
            key={group}
            name={group}
            isActive={selectedGroup === group}
            onPress={() => setSelectedGroup(group)}
          />
        ))}
      </HStack>
    </VStack>
  );
}
