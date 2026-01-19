export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
  full_name: string;
  confirm_password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
  nickname: string;
}

export type TabType = "login" | "register";

export type AuthFormProps = {
  tab: TabType;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  logout: () => void;
};
