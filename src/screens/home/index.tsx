import { useState } from "react";
import { FlatList } from "react-native";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { ExerciseCard } from "@/components/exercise-card";
import { Group } from "@/components/group";
import { HomeHeader } from "@/components/home-header";

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

      <VStack className="px-8">
        <HStack className="mb-5 items-center justify-between">
          <Heading className="text-base font-bold text-gray-200">
            Exercícios
          </Heading>

          <Text className="text-sm font-normal text-gray-200">4</Text>
        </HStack>

        <ExerciseCard />
      </VStack>
    </VStack>
  );
}
