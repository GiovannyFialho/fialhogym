import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { z } from "zod";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import BackgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

const formDataSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    password_confirm: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.password_confirm, {
    path: ["password_confirm"],
    message: "As senhas não coincidem",
  });

type FormDataProps = z.infer<typeof formDataSchema>;

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataProps) {
    console.log({ data });
    reset();
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
          <VStack className="flex-1">
            <Image
              className="absolute h-[624px] w-full"
              source={BackgroundImg}
              alt="Pessoas treinando"
              defaultSource={BackgroundImg}
            />

            <VStack className="flex-1 px-10 pb-16">
              <Box className="my-24 items-center justify-center">
                <Logo />

                <Text className="text-sm color-slate-100">
                  Treine sua mente e o seu corpo.
                </Text>
              </Box>

              <Box className="flex-1 items-center justify-center gap-2">
                <Heading className="text-2xl text-gray-100">
                  Crie sua conta
                </Heading>

                <Controller
                  control={control}
                  name="name"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      placeholder="Nome"
                      returnKeyType="next"
                      onChangeText={onChange}
                      errorMessage={errors.name?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      placeholder="E-mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType="next"
                      onChangeText={onChange}
                      errorMessage={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      placeholder="Senha"
                      secureTextEntry
                      returnKeyType="next"
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password_confirm"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      placeholder="Confirme a senha"
                      secureTextEntry
                      returnKeyType="send"
                      onChangeText={onChange}
                      errorMessage={errors.password_confirm?.message}
                      onSubmitEditing={handleSubmit(handleSignUp)}
                    />
                  )}
                />

                <Button
                  title="Criar e acessar"
                  onPress={handleSubmit(handleSignUp)}
                />
              </Box>

              <Box className="mt-4">
                <Button
                  title="Voltar para o login"
                  variant="outline"
                  onPress={handleGoBack}
                />
              </Box>
            </VStack>
          </VStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
