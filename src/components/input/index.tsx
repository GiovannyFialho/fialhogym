import { Input as GluestackInput, InputField } from "@/components/ui/input";
import { ComponentProps } from "react";

type InputProps = ComponentProps<typeof InputField>;

export function Input({ ...rest }: InputProps) {
  return (
    <GluestackInput className="h-14 rounded-md border-2 border-gray-700 bg-gray-700 px-4">
      <InputField className="text-white" {...rest} />
    </GluestackInput>
  );
}
