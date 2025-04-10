import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { type AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import BackgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <VStack>
            <Image
              className="absolute h-[624px] w-full"
              source={BackgroundImg}
              alt="Pessoas treinando"
              defaultSource={BackgroundImg}
            />

            <VStack className="px-10 pb-16">
              <Box className="my-24 items-center justify-center">
                <Logo />

                <Text className="text-sm color-slate-100">
                  Treine sua mente e o seu corpo.
                </Text>
              </Box>

              <Box className="my-24 items-center justify-center gap-2">
                <Heading className="text-2xl text-gray-100">
                  Acesse a conta
                </Heading>

                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input placeholder="Senha" secureTextEntry />

                <Button
                  title="Acessar"
                  className="h-14 w-full rounded-sm border-green-300 bg-green-500"
                />
              </Box>

              <Box className="mt-4 items-center justify-end">
                <Text className="mb-3 text-sm font-medium text-gray-100">
                  Ainda não tem acesso?
                </Text>

                <Button
                  title="Criar conta"
                  variant="outline"
                  className="h-14 w-full rounded-sm border-green-300"
                  onPress={handleNewAccount}
                />
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
