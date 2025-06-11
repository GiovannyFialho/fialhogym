import { zodResolver } from "@hookform/resolvers/zod";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import { z } from "zod";

import { useAuth } from "@/hooks/useAuth";
import { api } from "@/service/api";
import { AppError } from "@/utils/app-error";

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

import userPhotoDefault from "@/assets/userPhotoDefault.png";

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
    const hasPassword = data.password != null && data.password !== "";
    const hasPasswordConfirm =
      data.password_confirm != null && data.password_confirm !== "";
    const hasOldPassword =
      data.old_password != null && data.old_password !== "";

    if (hasPassword && data.password!.length < 6) {
      ctx.addIssue({
        path: ["password"],
        message: "A senha deve ter pelo menos 6 caracteres",
        code: z.ZodIssueCode.custom,
      });
    }

    if (hasPasswordConfirm && data.password_confirm!.length < 6) {
      ctx.addIssue({
        path: ["password_confirm"],
        message: "Confirme sua senha com pelo menos 6 caracteres",
        code: z.ZodIssueCode.custom,
      });
    }

    if (hasPassword && !hasPasswordConfirm && !hasOldPassword) {
      ctx.addIssue({
        path: ["password_confirm"],
        message: "Confirme sua senha com pelo menos 6 caracteres",
        code: z.ZodIssueCode.custom,
      });

      ctx.addIssue({
        path: ["old_password"],
        message: "Informe a senha atual para alterar a nova senha",
        code: z.ZodIssueCode.custom,
      });
    }

    if (hasPassword && hasPasswordConfirm) {
      if (data.password !== data.password_confirm) {
        ctx.addIssue({
          path: ["password_confirm"],
          message: "As senhas não coincidem",
          code: z.ZodIssueCode.custom,
        });
      }

      if (!hasOldPassword) {
        ctx.addIssue({
          path: ["old_password"],
          message: "Informe a senha atual para alterar a nova senha",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type FormDataProps = z.infer<typeof formDataSchema>;

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, updateUserProfile } = useAuth();
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

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name.split(" ")[0]}.${fileExtension}`.toLocaleLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              title="Foto atualizada!"
              action="success"
              onClose={() => toast.close(id)}
            />
          ),
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated);
      }
    } catch (err) {
      console.log(`Error:: `, err);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);
      await updateUserProfile(userUpdated);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            title="Perfil atualizado com sucesso"
            action="success"
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar dados. Tente novamente mais tarde";

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
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <VStack className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Box className="mt-6 items-center justify-center px-10">
          <UserPhoto
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                : userPhotoDefault
            }
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
                  textContentType="none"
                  autoComplete="off"
                  importantForAutofill="no"
                  autoCorrect={false}
                  keyboardType="default"
                  placeholder="Senha antiga"
                  className="bg-darkGray text-white"
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
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
                  textContentType="none"
                  autoComplete="off"
                  importantForAutofill="no"
                  autoCorrect={false}
                  keyboardType="default"
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
                  textContentType="none"
                  autoComplete="off"
                  importantForAutofill="no"
                  autoCorrect={false}
                  keyboardType="default"
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
              isLoading={isUpdating}
            />
          </Box>
        </Box>
      </ScrollView>
    </VStack>
  );
}
