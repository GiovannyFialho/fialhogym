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
        className="absolute w-full h-[624px]"
        source={BackgroundImg}
        alt="Pessoas treinando"
        defaultSource={BackgroundImg}
      />

      <VStack className="px-10 pb-16">
        <Box className="justify-center items-center my-24">
          <Logo />

          <Text className="color-slate-100 text-sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Box>

        <Box className="justify-center items-center gap-2 my-24">
          <Heading className="text-gray-100 text-2xl">Acesse a conta</Heading>

          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
        </Box>
      </VStack>
    </VStack>
  );
}
