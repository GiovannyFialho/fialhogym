import { Input as GluestackInput, InputField } from "@/components/ui/input";
import { ComponentProps, useState } from "react";
import { ViewStyle } from "react-native";

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
};

export function Input({ isReadOnly = false, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    borderColor: isFocused ? "#4ade80" : "#374151", // green-400 ou gray-700
  };

  return (
    <GluestackInput
      style={containerStyle}
      className={`h-[56px] rounded-lg border-2 ${isReadOnly ? "opacity-50" : "opacity-100"}`}
      isReadOnly={isReadOnly}
    >
      <InputField
        className="text-w bg-slate-700 px-4"
        style={{ color: "#ffffff" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
    </GluestackInput>
  );
}
