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
	endsAt: z
		.date()
		.nullable()
		.superRefine((val, ctx) => {
			if (val === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.invalid_date,
					message: "Your poll's end date isn't a valid date.",
				});
			}

			if (val && new Date().getTime() >= val.getTime()) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					minimum: new Date().getTime(),
					inclusive: false,
					type: "string",
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
