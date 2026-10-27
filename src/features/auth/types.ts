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
  password: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  user: AuthUser;
  success: boolean;
  statusCode: number

}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}
