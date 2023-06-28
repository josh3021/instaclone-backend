import { Context, Resolver } from "@/types";
import { PrismaClient } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import jwt from "jsonwebtoken";
import { IToken } from "./editProfile/editProfile.resolvers.types";

export const getUser = async (client: PrismaClient, token?: string) => {
  if (!token) return null;
  const { id } = jwt.verify(token, process.env.JWT_SECRET!) as IToken;
  const user = await client.user.findUnique({ where: { id } });
  console.log(user);
  if (!user) return null;
  return user;
};

export function protectResolver<T>(resolver: Resolver<T>) {
  return function (
    root: any,
    args: T,
    context: Context,
    info: GraphQLResolveInfo
  ) {
    if (!context.loggedInUser) {
      return {
        result: false,
        error: "You need to Login",
      };
    }
    return resolver(root, args, context, info);
  };
}
