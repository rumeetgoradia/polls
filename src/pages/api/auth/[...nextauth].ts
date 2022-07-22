import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return await NextAuth(req, res, {
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
							isGuest: true,
						},
					});

					return {
						...user,
					};
				},
			}),
		],
		callbacks: {
			async jwt({ user, token }) {
				if (user) {
					token.isGuest = user.isGuest;
				}
				return token;
			},
			async session({ session, token }) {
				const user: User = {
					...session.user,
					id: token.sub!,
					isGuest: token.isGuest,
				};
				return {
					...session,
					user,
					isGuest: user.isGuest,
				};
			},
		},
		session: {
			strategy: "jwt",
		},
		secret: process.env.NEXTAUTH_SECRET,
	});
}
