export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

type AuthStoreActions = {
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

type AuthStoreState = {
  user: User | null;
  isAuthenticated: boolean;
}

export type AuthStore = AuthStoreState & AuthStoreActions

