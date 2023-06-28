import { Resolver } from "@/types";
import { User } from "@prisma/client";

const seeProfile: Resolver<User> = async (_, { username }, { client }) => {
  const user = await client.user.findUnique({ where: { username } });
  if (!user) {
    return {
      result: false,
      message: "User not found.",
    };
  }
  return {
    result: true,
    user,
  };
};

const resolvers = {
  Query: {
    seeProfile,
  },
};

export default resolvers;
