export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNo: string | null;
  profilePic: string | null;
  role: string | null;
}

export interface LoginPayload {
  email: string;
  passsword: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
