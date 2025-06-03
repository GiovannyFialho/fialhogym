import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { type NavigationProps } from "@/routes/app.routes";
import { api } from "@/service/api";
import { AppError } from "@/utils/app-error";

import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";

import { ExerciseCard } from "@/components/exercise-card";
import { Group } from "@/components/group";
import { HomeHeader } from "@/components/home-header";
import { ToastMessage } from "@/components/toast-message";

export function Home() {
  const toast = useToast();

  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ]);

  const [selectedGroup, setSelectedGroup] = useState<string | null>("costas");

  const navigation = useNavigation<NavigationProps>();

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");

      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos. Tente novamente mais tarde";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title={title}
            action="error"
            onClose={() => toast.close(id)}
          />
        ),
      });
    }
  }

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <VStack className="flex-1">
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
            isActive={
              selectedGroup.toLocaleLowerCase() === item.toLocaleLowerCase()
            }
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />

      <VStack className="flex-1 px-8">
        <HStack className="mb-5 items-center justify-between">
          <Heading className="text-base font-bold text-gray-200">
            Exercícios
          </Heading>

          <Text className="text-sm font-normal text-gray-200">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
        />
      </VStack>
    </VStack>
  );
}
