import { z } from "zod";

export const pollFieldsValidator = z.object({
	title: z
		.string()
		.min(1, "Please enter a title for your poll.")
		.max(
			600,
			"You've reached the maximum number of characters allowed for the title."
		),
	description: z
		.string()
		.max(
			5000,
			"You've reached the maximum number of characters allowed for the description."
		)
		.optional(),
	options: z.array(
		z.object({
			title: z.string(),
		})
	),
	isPublic: z.boolean(),
	isMultipleSelection: z.boolean(),
	resultsVisibility: z.enum(["OWNER", "VOTER", "PUBLIC"]),
	endsAt: z
		.date()
		.superRefine((val, ctx) => {
			if (new Date().getTime() >= new Date(val).getTime()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: "Your poll's end date can't be in the past.",
				});
			}
		})
		.optional(),
});

export type CreatePollFields = z.infer<typeof pollFieldsValidator>;

export const isValidDateString = (dateString: string): boolean => {
	const date = new Date(dateString);

	return date instanceof Date && !isNaN(date.getTime());
};
