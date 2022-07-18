import { createRouter } from "@/backend/router/context";
import { prisma } from "@/db/prisma";
import { z } from "zod";

export const usersRouter = createRouter().mutation("merge-guest-account", {
	input: z.object({
		guestId: z.string(),
	}),
	async resolve({ input: { guestId }, ctx: { token: userId } }) {
		if (!guestId || !userId || guestId === userId) {
			return;
		}

		await prisma.poll.updateMany({
			where: {
				userId: guestId,
			},
			data: {
				userId,
			},
		});

		await prisma.vote.updateMany({
			where: {
				userId: guestId,
			},
			data: {
				userId,
			},
		});

		try {
			await prisma.user.delete({
				where: {
					id: guestId,
				},
			});
		} catch (e) {}
	},
});
