import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import { type NavigationProps } from "@/routes/app.routes";

import { Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";

export function Exercise() {
  const navigation = useNavigation<NavigationProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack className="flex-1">
      <VStack className="bg-darkGray px-8 pb-12 pt-24">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} className="color-green-500" size="xl" />
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
}
