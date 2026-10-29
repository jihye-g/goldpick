import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApis } from "./apis";
import { authKeys } from "./keys";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApis.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authApis.signup,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApis.logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null);
    },
  });
}
