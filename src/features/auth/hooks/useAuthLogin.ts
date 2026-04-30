import { useCustomMutation } from "@/share/hooks/cus-use-mutation";
import { authApi } from "../apis/auth.api";
import { AUTH_ENDPOINTS } from "../endpoints";
import type { LoginResponseClass } from "../models/class/user.class";

export function useAuthLogin() {
	return useCustomMutation<LoginResponseClass, { accessToken: string | null }>({
		key: AUTH_ENDPOINTS.AUTH_LOGIN,
		fn: authApi.login,
	});
}
