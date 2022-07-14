/** @see https://masteringjs.io/tutorials/fundamentals/compare-arrays */
export function arrayEquals(a: any[], b: any[]) {
	return (
		Array.isArray(a) &&
		Array.isArray(b) &&
		a.length === b.length &&
		a.every((val) => b.includes(val))
	);
}
