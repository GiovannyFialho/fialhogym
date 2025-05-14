import { white } from "tailwindcss/colors";

import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";

export function Loading() {
  return (
    <Box className="flex-1 justify-center items-center">
      <Spinner size="large" color={white} />
    </Box>
  );
}
