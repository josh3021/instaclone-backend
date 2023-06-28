import { Resolver } from "@/types";
import * as bcrypt from "bcrypt";
import { CreateAccount } from "./createAccount.resolvers.types";

const createAccount: Resolver<CreateAccount> = async (
  _: any,
  { firstName, lastName, username, email, password },
  { client }
) => {
  try {
    const existingUser = await client.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    if (existingUser) {
      return {
        result: false,
        message: "This username/email is already taken.",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        username,
      },
    });
    return {
      result: true,
    };
  } catch (err) {
    return { result: false, message: err };
  }
};

const resolvers = {
  Mutation: {
    createAccount,
  },
};
export default resolvers;
