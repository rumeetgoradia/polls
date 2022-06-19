import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import NextAuth from "next-auth";
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
				const { id } = await prisma.user.create({
					data: {
						id: nanoid(),
						name: "guest",
					},
				});
				return {
					id,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			console.log(session, token);
			return {
				...session,
				isLoggedIn: token.sub !== undefined,
				user: {
					...session.user,
					id: token.sub,
					name: "guest",
				},
			};
		},
	},
	session: {
		strategy: "jwt",
	},
});
