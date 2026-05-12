import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
  fullName: string;
  email: string;
  password: string;
  passwordUpdatedAt?: string;
};

type AuthStore = {
  user: User | null;
  isLoggedIn: boolean;

  signup: (data: User) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updatePassword: (password: string) => void;

  biometricVerification: boolean;
  setBiometricVerification: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      signup: (data) =>
        set({
          user: {
            ...data,
            passwordUpdatedAt: new Date().toISOString(),
          },
          isLoggedIn: true,
        }),

      login: (email, password) => {
        const user = get().user;

        if (user?.email === email && user?.password === password) {
          set({ isLoggedIn: true });
          return true;
        }

        return false;
      },

      logout: () =>
        set({
          isLoggedIn: false,
        }),

      updatePassword: (password) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                password,
                passwordUpdatedAt: new Date().toISOString(),
              }
            : null,
        })),

      biometricVerification: true,
      setBiometricVerification: (value) =>
        set({
          biometricVerification: value,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        user: state.user,
        biometricVerification: state.biometricVerification,
      }),
    },
  ),
);
