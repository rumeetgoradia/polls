export const getApproximateTimeBetween = (
	time1: Date,
	time2: Date = new Date()
): string => {
	let difference = Math.abs(time1.getTime() - time2.getTime());

	for (let i = 0; i < TIME_INTERVALS.length - 1; ++i) {
		const timeInterval = TIME_INTERVALS[i];
		const nextTimeInterval = TIME_INTERVALS[i + 1];

		difference /= timeInterval?.smallerUnitsContained!;
		difference = Math.floor(difference);

		if (difference < nextTimeInterval?.smallerUnitsContained!) {
			return formatApproximateTime(difference, timeInterval?.identifier!);
		}
	}

	const lastTimeInterval = TIME_INTERVALS[TIME_INTERVALS.length - 1];

	return formatApproximateTime(
		difference / lastTimeInterval?.smallerUnitsContained!,
		lastTimeInterval?.identifier!
	);
};

const formatApproximateTime = (time: number, identifer: string): string => {
	const flooredTime = Math.floor(time);

	return `${flooredTime} ${identifer}${flooredTime !== 1 ? "s" : ""}`;
};

type TimeInterval = {
	smallerUnitsContained: number;
	identifier: string;
};

const TIME_INTERVALS: TimeInterval[] = [
	{
		smallerUnitsContained: 1000,
		identifier: "second",
	},
	{
		smallerUnitsContained: 60,
		identifier: "minute",
	},
	{
		smallerUnitsContained: 60,
		identifier: "hour",
	},
	{
		smallerUnitsContained: 24,
		identifier: "day",
	},
	{
		smallerUnitsContained: 7,
		identifier: "week",
	},
	{
		smallerUnitsContained: 4,
		identifier: "month",
	},
	{
		smallerUnitsContained: 12,
		identifier: "year",
	},
];
