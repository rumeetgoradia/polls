import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			id: "anon",
			name: "Anonymous",
			credentials: {},
			async authorize() {
				const user = await prisma.user.create({
					data: {
						id: nanoid(),
						name: "guest",
					},
				});
				return {
					...user,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			const user: User = { ...session.user, id: token.sub! };
			return {
				...session,
				user,
				isGuest: user.name === "guest",
			};
		},
	},
	session: {
		strategy: "jwt",
	},
});
