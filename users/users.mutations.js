import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("This username/email is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            email,
            firstName,
            password: hashedPassword,
            username,
          },
        });
      } catch (e) {
        return e;
      }
    },
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          message: "User does not exists",
        };
      }
      const isPasswordCompared = await bcrypt.compare(password, user.password);
      if (!isPasswordCompared) {
        return {
          ok: false,
          message: "Password does not match",
        };
      }
      // create token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return {
        ok: true,
        token,
      };
    },
  },
};
