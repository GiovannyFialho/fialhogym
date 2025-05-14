import { ComponentProps } from "react";

import {
  ButtonSpinner,
  Button as GluestackButton,
} from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type ButtonProps = ComponentProps<typeof GluestackButton> & {
  title: string;
  variant?: "solid" | "outline";
  isLoading?: boolean;
};

export function Button({
  title,
  variant = "solid",
  isLoading = false,
  ...rest
}: ButtonProps) {
  return (
    <GluestackButton
      disabled={isLoading}
      className={`h-14 w-full rounded-sm border-green-500 ${variant === "outline" ? "border bg-transparent" : "border-0 bg-green-500"}`}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner color="#fff" />
      ) : (
        <Text
          className={`text-sm font-bold ${variant === "outline" ? "text-green-500" : "text-white"}`}
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  );
}
