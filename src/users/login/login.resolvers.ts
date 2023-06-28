import { Resolver } from "@/types";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Login } from "./login.resolvers.types";

const login: Resolver<Login> = async (
  _: any,
  { username, password },
  { client }
) => {
  const user = await client.user.findFirst({ where: { username } });
  if (!user) {
    return {
      result: false,
      message: "User does not exists",
    };
  }
  const isPasswordCompared = await bcrypt.compare(password, user.password);
  if (!isPasswordCompared) {
    return {
      result: false,
      message: "Password does not match",
    };
  }
  // create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
  return {
    result: true,
    token,
  };
};

const resolvers = {
  Mutation: {
    login,
  },
};

export default resolvers;
