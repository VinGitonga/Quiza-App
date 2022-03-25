import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../mongodb/connectDB";
import User from "../../../mongodb/models/User";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                connectDB();

                let user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    console.log("err user");
                    throw new Error("User not found");
                }

                if (!user.authenticate(credentials.password)) {
                    throw new Error("Email or Password dont match");
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
});
