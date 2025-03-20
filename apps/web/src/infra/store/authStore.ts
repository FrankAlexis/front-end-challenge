import { AuthStore } from "@/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUseCase } from "@/infra/use-cases";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        return AuthUseCase.add({ set, get }, email, password);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
