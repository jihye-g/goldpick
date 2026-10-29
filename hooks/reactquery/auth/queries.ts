import { useQuery } from "@tanstack/react-query";
import { authApis } from "./apis";
import { authKeys } from "./keys";

export function useMe() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: authApis.getMe,
  });
}
