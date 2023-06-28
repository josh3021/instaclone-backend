import { PrismaClient, User } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";

type Context = {
  client: PrismaClient;
  loggedInUser: User;
};

type ResolverArgs<T> = {
  root: any;
  args: T;
  context: Context;
  info: GraphQLResolveInfo;
};

export type Resolver<T> = (
  root: any,
  args: T,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<ResolverResult>;

export type ResolverResult = {
  result: boolean;
  message?: any;
  [key: string]: any;
};
