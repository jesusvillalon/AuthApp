import { User } from "./user.interface";

export interface LogoutResponse {
  user:  User;
  token: string;
}
