import type { Request, Response } from "express";
import { getUserByOpenId } from "../db";

export type TrpcContext = {
  user?: {
    id: number;
    openId: string;
    email?: string | null;
    name?: string | null;
    role: "user" | "admin";
  };
  req: Request;
  res: Response;
};

export async function createContext({
  req,
  res,
}: {
  req: Request;
  res: Response;
}): Promise<TrpcContext> {
  // Extract user from session/JWT if available
  const openId = (req as any).userId; // This would be set by auth middleware

  let user: TrpcContext["user"] | undefined;
  if (openId) {
    const dbUser = await getUserByOpenId(openId);
    if (dbUser) {
      user = {
        id: dbUser.id,
        openId: dbUser.openId,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
      };
    }
  }

  return {
    user,
    req,
    res,
  };
}
