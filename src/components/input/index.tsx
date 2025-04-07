import { Input as GluestackInput, InputField } from "@/components/ui/input";
import { ComponentProps, useState } from "react";
import { ViewStyle } from "react-native";

type InputProps = ComponentProps<typeof InputField>;

export function Input({ ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    height: 56, // h-14
    borderRadius: 8, // rounded-md
    borderWidth: 2,
    borderColor: isFocused ? "#4ade80" : "#374151", // green-400 ou gray-700
    backgroundColor: "#374151", // bg-gray-700
    paddingHorizontal: 16, // px-4
  };

  return (
    <GluestackInput style={containerStyle}>
      <InputField
        style={{ color: "#ffffff" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </GluestackInput>
  );
}
