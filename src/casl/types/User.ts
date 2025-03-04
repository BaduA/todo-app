import { Role } from "@prisma/client";

export class User {
    userId: string;
    role: Role;
  }