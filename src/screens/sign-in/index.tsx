import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { Input } from "@/components/input";

import BackgroundImg from "@/assets/background.png";
import Logo from "@/assets/logo.svg";

export function SignIn() {
  return (
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
          <Heading className="text-2xl text-gray-100">Acesse a conta</Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />
        </Box>
      </VStack>
    </VStack>
  );
}
