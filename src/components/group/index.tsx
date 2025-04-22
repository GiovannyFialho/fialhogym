import { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

type GroupProps = ComponentProps<typeof Button> & {
  name: string;
  isActive?: boolean;
};

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Button
      className={`bg-darkGray h-10 min-w-24 items-center justify-center rounded-md border ${
        isActive ? "border-green-500" : "border-darkGray"
      }`}
      {...rest}
    >
      <Text
        className={`text-xs font-semibold uppercase ${isActive ? "text-green-500" : "text-gray-200"}`}
      >
        {name}
      </Text>
    </Button>
  );
}
