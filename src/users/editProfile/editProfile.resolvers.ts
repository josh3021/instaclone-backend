import bcrypt from "bcrypt";
import { protectResolver } from "../users.utils";
import { EditProfileArgs } from "./editProfile.resolvers.types";

const editProfile = protectResolver<EditProfileArgs>(
  async (
    _,
    { email, firstName, lastName, password: newPassword, username },
    { client, loggedInUser }
  ) => {
    let newHashedPassword = null;
    if (newPassword) {
      newHashedPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
      data: {
        firstName,
        lastName,
        username,
        email,
        ...(newHashedPassword && { password: newHashedPassword }),
      },
    });
    if (updatedUser.id) {
      return {
        result: true,
      };
    } else {
      return {
        result: false,
        error: "Could not update profile.",
      };
    }
  }
);

const resolvers = {
  Mutation: {
    editProfile,
  },
};

export default resolvers;
