import { useState } from "react";
import { SectionList } from "react-native";

import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { HistoryCard } from "@/components/history-card";
import { ScreenHeader } from "@/components/screen-header";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "24.04.2025",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "25.04.2025",
      data: ["Puxada frontal"],
    },
  ]);

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading className="mb-3 mt-10 text-base font-bold text-gray-200">
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: "center",
          }
        }
        ListEmptyComponent={() => (
          <Text className="text-center text-base text-gray-100">
            Não há exercíceios registrados ainda. {"\n"} Vamos fazer exercícios
            hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
