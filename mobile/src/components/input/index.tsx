import { ComponentProps, useState } from "react";
import { ViewStyle } from "react-native";

import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input as GluestackInput, InputField } from "@/components/ui/input";

type InputProps = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
  isInvalid?: boolean;
  errorMessage?: string | null;
};

export function Input({
  isReadOnly = false,
  isInvalid = false,
  errorMessage = null,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const invalid = !!errorMessage || isInvalid;

  const containerStyle: ViewStyle = {
    borderColor: invalid ? "#ef4444" : isFocused ? "#4ade80" : "#202024", // red-500 / green-400 / darkGray
  };

  return (
    <FormControl isInvalid={invalid} className="mb-4 w-full">
      <GluestackInput
        style={containerStyle}
        className={`h-[56px] rounded-lg border-2 ${isReadOnly ? "opacity-50" : "opacity-100"}`}
        isReadOnly={isReadOnly}
      >
        <InputField
          className="text-w bg-darkGray px-4 color-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </GluestackInput>

      <FormControlError>
        <FormControlErrorText className="color-red-500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
