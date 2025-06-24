export type User = {
  id?: string;
  name: string;
  email: string;
  createdAt: string;
};

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    createdAt?: string[];
  };
  message?: string | null;
};