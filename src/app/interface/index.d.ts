import { User } from "../../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
        email: string;
        username?: string;
        name?: string;
      }
    };
  }
}
