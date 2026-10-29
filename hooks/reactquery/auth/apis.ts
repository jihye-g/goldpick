import { createClient } from "@/lib/supabase/client";

export interface Me {
  id: string;
  email: string;
  name: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export const authApis = {
  getMe: async (): Promise<Me | null> => {
    const { data: { user } } = await createClient().auth.getUser();
    if (!user) return null;
    return {
      id: user.id,
      email: user.email ?? "",
      name: (user.user_metadata?.name as string | undefined) ?? null,
    };
  },
  login: async ({ email, password }: LoginRequest) => {
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) throw error;
  },
  signup: async ({ email, name, password }: SignupRequest) => {
    const { error } = await createClient().auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
  },
  logout: async () => {
    const { error } = await createClient().auth.signOut();
    if (error) throw error;
  },
};
