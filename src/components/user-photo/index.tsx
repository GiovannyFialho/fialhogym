import { Image } from "@/components/ui/image";
import { ComponentProps } from "react";

type UserPhotoProps = ComponentProps<typeof Image>;

export function UserPhoto({ ...rest }: UserPhotoProps) {
  return (
    <Image
      className="rounded-full border-2 border-gray-400 bg-gray-500"
      {...rest}
    />
  );
}
