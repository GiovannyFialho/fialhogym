import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

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

      <Box className="justify-center items-center my-24">
        <Logo />

        <Text className="color-slate-100 text-sm">
          Treine sua mente e o seu corpo.
        </Text>
      </Box>
    </VStack>
  );
}
