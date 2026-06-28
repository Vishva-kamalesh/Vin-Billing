import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, type LoginResponse } from "../services/auth.service";

export function useAuth() {
  // Query to get current user info
  const meQuery = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
    retry: false, // Don't retry if unauthorized
  });

  return {
    user: meQuery.data?.user || null,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
    isAuthenticated: !!meQuery.data?.user,
  };
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse) => {
      // Save token
      localStorage.setItem("auth_token", data.accessToken);
      // Inform query client we have user data now
      queryClient.setQueryData(["auth", "me"], { user: data.user });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
      window.location.href = "/login";
    },
  });
}
