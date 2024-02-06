import { checkPassword } from "@/lib/argon2";
import ConnectToMongoDb from "@/lib/mongo";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const client = await ConnectToMongoDb();

        const db = client.db();

        // const { db } = await connectToDatabase();

        const user = await db
          .collection("Users")
          .findOne({ email: email });

        if (!user) {
          throw new Error("User not found!");
        }

        const isValid = await checkPassword(password, user.password);

        if (!isValid) {
          throw new Error("Password is not valid!!");
        }

        return { name: user.name };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
});
