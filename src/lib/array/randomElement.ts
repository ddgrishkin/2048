export function randomElement<T>(source: T[]): T {
	const indexLast = source.length - 1;
	const indexRnd = Math.round(Math.random() * indexLast);
	
	return source[indexRnd];
}
