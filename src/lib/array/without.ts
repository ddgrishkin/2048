export function without<V>(target: V[], ...exclude: V[]): V[] {
	return target.filter((item) => !exclude.includes(item));
}
