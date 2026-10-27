import { getErrorMessage, http } from "@/lib/httpClient";
import { LoginPayload, LoginResponse, SignUpPayload, SignUpResponse } from "@/features/auth/types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await http.post<LoginResponse>("/login", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  try {
    const response = await http.post<SignUpResponse>("/user/signup", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
