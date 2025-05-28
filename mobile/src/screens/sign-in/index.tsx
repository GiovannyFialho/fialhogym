import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import { AppError } from "@/utils/app-error";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ToastMessage } from "@/components/toast-message";

import { type AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import BackgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

const formDataSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormDataProps = z.infer<typeof formDataSchema>;

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { signIn } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde";

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

      setIsLoading(false);
    }
  }

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

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      value={value}
                      placeholder="E-mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
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
                      onChangeText={onChange}
                      errorMessage={errors.password?.message}
                    />
                  )}
                />

                <Button
                  title="Acessar"
                  isLoading={isLoading}
                  onPress={handleSubmit(handleSignIn)}
                />
              </Box>

              <Box className="mt-4 items-center justify-end">
                <Text className="mb-3 text-sm font-medium text-gray-100">
                  Ainda não tem acesso?
                </Text>

                <Button
                  title="Criar conta"
                  variant="outline"
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
