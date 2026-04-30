declare global {
	interface String {
		format(params: Record<string, string | number | null | undefined>): string;
		format(...values: Array<string | number | null | undefined>): string;
	}
}

const TEMPLATE_PARAM_REGEX = /:\{\s*(\w+)\s*\}|:(\w+)/g;

function formatImpl(
	this: string,
	...args: Array<
		string | number | null | undefined | Record<string, string | number | null | undefined>
	>
): string {
	const isObjectForm = args.length === 1 && typeof args[0] === "object" && args[0] !== null;

	let positionalIndex = 0;

	return this.replace(TEMPLATE_PARAM_REGEX, (match, braced?: string, plain?: string) => {
		const key = braced ?? plain;
		if (!key) {
			return match;
		}

		if (isObjectForm) {
			const params = args[0] as Record<string, string | number | null | undefined>;
			const value = params[key];
			if (value === undefined || value === null) {
				return match;
			}
			return String(value);
		}

		if (positionalIndex >= args.length) {
			return match;
		}
		const value = args[positionalIndex++] as string | number | null | undefined;
		if (value === undefined || value === null) {
			return match;
		}
		return String(value);
	});
}

if (!Object.hasOwn(String.prototype, "format")) {
	Object.defineProperty(String.prototype, "format", {
		value: formatImpl,
		writable: true,
		configurable: true,
		enumerable: false,
	});
}

export {};
