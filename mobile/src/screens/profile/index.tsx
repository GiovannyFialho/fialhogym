import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { ScreenHeader } from "@/components/screen-header";
import { ToastMessage } from "@/components/toast-message";
import { UserPhoto } from "@/components/user-photo";
import { zodResolver } from "@hookform/resolvers/zod";

const formDataSchema = z
  .object({
    name: z.string().min(1, "Informe o nome"),
    email: z.string(),
    old_password: z
      .string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .optional(),
    password: z
      .string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .optional(),
    password_confirm: z
      .string()
      .transform((value) => (value === "" ? null : value))
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password && data.password.length < 6) {
      ctx.addIssue({
        path: ["password"],
        message: "A senha deve ter pelo menos 6 caracteres",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password_confirm && data.password_confirm.length < 6) {
      ctx.addIssue({
        path: ["password_confirm"],
        message: "Confirme sua senha",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.password || data.password_confirm) {
      if (data.password !== data.password_confirm) {
        ctx.addIssue({
          path: ["password_confirm"],
          message: "As senhas não coincidem",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type FormDataProps = z.infer<typeof formDataSchema>;

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/GiovannyFialho.png",
  );

  const { user } = useAuth();
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      old_password: "",
      password: "",
      password_confirm: "",
    },
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoURI = photoSelected.assets[0].uri;

      if (photoURI) {
        const photoInfo = (await FileSystem.getInfoAsync(photoURI)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                title="Ops! Imagem muito grande"
                description="Essa mensagem é muito grande, escolha uma de até 5MB."
                action="error"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        setUserPhoto(photoURI);
      }
    } catch (err) {
      console.log(`Error:: `, err);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    console.log({ data });
  }

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Box className="mt-6 items-center justify-center px-10">
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="mb-8 mt-2 text-base font-bold text-green-500">
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Box className="w-full gap-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  placeholder="Nome"
                  className="bg-darkGray text-white"
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
                  isReadOnly
                  placeholder="E-mail"
                  className="bg-darkGray text-white"
                  onChangeText={onChange}
                />
              )}
            />
          </Box>

          <Heading className="mb-2 mt-12 self-start text-base font-bold text-gray-200">
            Alterar senha
          </Heading>

          <Box className="w-full gap-4">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  secureTextEntry
                  placeholder="Senha antiga"
                  className="bg-darkGray text-white"
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  secureTextEntry
                  placeholder="Nova senha"
                  className="bg-darkGray text-white"
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
                  secureTextEntry
                  placeholder="Confirme a nova senha"
                  className="bg-darkGray text-white"
                  onChangeText={onChange}
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
}
