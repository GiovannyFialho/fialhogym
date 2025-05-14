import { X } from "lucide-react-native";

import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Toast, ToastDescription, ToastTitle } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";

interface ToastMessageProps {
  id: string;
  title: string;
  description?: string;
  action?: "error" | "success";
  onClose: () => void;
}

export function ToastMessage({
  id,
  title,
  description,
  action,
  onClose,
}: ToastMessageProps) {
  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      className={`${action === "success" ? "bg-green-500" : "bg-red-500"} mt-10`}
    >
      <VStack space="xs" className="w-full">
        <Pressable className="self-end" onPress={onClose}>
          <Icon as={X} className="color-gray-50" size="md" />
        </Pressable>

        <ToastTitle className="font-bold color-white">{title}</ToastTitle>

        {description && (
          <ToastDescription className="font-normal color-white">
            {description}
          </ToastDescription>
        )}
      </VStack>
    </Toast>
  );
}
