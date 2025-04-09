import { ComponentProps } from "react";

import {
  ButtonSpinner,
  Button as GluestackButton,
} from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading = false, ...rest }: ButtonProps) {
  return (
    <GluestackButton disabled={isLoading} {...rest}>
      {isLoading ? (
        <ButtonSpinner color="#fff" />
      ) : (
        <Text
          className={`text-sm font-bold ${rest.variant === "outline" ? "text-green-300" : "text-white"}`}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}
