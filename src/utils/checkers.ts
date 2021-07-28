export function checkLocation(location: number, name: string): void {
	if (location < 0) {
		console.log(`no location: ${name}`);
	}
}
