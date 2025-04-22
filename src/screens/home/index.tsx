import { useState } from "react";

import { VStack } from "@/components/ui/vstack";

import { Group } from "@/components/group";
import { HomeHeader } from "@/components/home-header";
import { FlatList } from "react-native";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Pernas",
    "Peito",
    "Bíceps",
    "Ombro",
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <VStack>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(group) => group}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 14 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
        renderItem={({ item }) => (
          <Group
            key={item}
            name={item}
            isActive={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />
    </VStack>
  );
}
