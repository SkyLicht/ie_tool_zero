// ./types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

type Permission = {
  name: string;
};

export type Route = {
  route_pattern: string;
  role_name: string;
  permissions: Permission[];
};

declare module "next-auth" {
  // Extend the default Session interface
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
      image?: string;
      routes: Route[]; // or a specific types if you have one
      token: string;
    } & DefaultSession["user"];
  }

  // Extend the default User interface
  interface User extends DefaultUser {
    more?: string;
  }
}
