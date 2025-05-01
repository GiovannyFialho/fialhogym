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

import BackgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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
                  Crie sua conta
                </Heading>

                <Input placeholder="Nome" />

                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input placeholder="Senha" secureTextEntry />

                <Button title="Criar e acessar" />
              </Box>

              <Button
                title="Voltar para o login"
                variant="outline"
                className="h-14 w-full rounded-sm border-green-300"
                onPress={handleGoBack}
              />
            </VStack>
          </VStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
