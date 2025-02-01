export type UserCredentials = {
  email: string;
  password: string;
};

export type UserId = string;

export type User = UserCredentials & {
  id: UserId;
};
