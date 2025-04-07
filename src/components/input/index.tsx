import { Input as GluestackInput, InputField } from "@/components/ui/input";
import { ComponentProps } from "react";

type InputProps = ComponentProps<typeof InputField>;

export function Input({ ...rest }: InputProps) {
  return (
    <GluestackInput className="bg-gray-700 h-14 px-4 border-0 rounded-md">
      <InputField className="color-white" {...rest} />
    </GluestackInput>
  );
}
