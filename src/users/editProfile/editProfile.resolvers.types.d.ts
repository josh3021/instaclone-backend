export type EditProfileArgs = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  username?: string;
};

export interface IToken {
  id: number;
  iat: number;
}
