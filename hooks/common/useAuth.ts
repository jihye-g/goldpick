import { useMe } from "@/hooks/reactquery/auth";

export function useAuth() {
  const { data: user, isLoading } = useMe();
  return { user: user ?? null, isLoading, isAuthenticated: !!user };
}
