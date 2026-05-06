declare global {
	interface String {
		format(params: Record<string, string | number | null | undefined>): string;
		format(...values: Array<string | number | null | undefined>): string;
	}
}

/** `:id`, `:{ param }`, etc. — e.g. API paths `/events/:{id}`. */
const COLON_TEMPLATE_REGEX = /:\{\s*(\w+)\s*\}|:(\w+)/g;
/** `{id}` curly placeholders — e.g. app routes `/boost/{id}`. */
const BRACE_TEMPLATE_REGEX = /\{\s*(\w+)\s*\}/g;

function formatImpl(
	this: string,
	...args: Array<
		string | number | null | undefined | Record<string, string | number | null | undefined>
	>
): string {
	const isObjectForm =
		args.length === 1 && typeof args[0] === "object" && args[0] !== null && !Array.isArray(args[0]);

	function replaceColonPatterns(value: string, nextPositional: () => string | undefined): string {
		return value.replace(COLON_TEMPLATE_REGEX, (match, braced?: string, plain?: string) => {
			const key = braced ?? plain;
			if (!key) {
				return match;
			}

			let resolved: string | undefined;

			if (isObjectForm) {
				const params = args[0] as Record<string, string | number | null | undefined>;
				const raw = params[key];
				resolved = raw === undefined || raw === null || raw === "" ? undefined : String(raw);
			} else {
				resolved = nextPositional();
			}

			return resolved ?? match;
		});
	}

	function replaceBracePatterns(value: string, nextPositional: () => string | undefined): string {
		return value.replace(BRACE_TEMPLATE_REGEX, (match, braceKey?: string) => {
			const key = braceKey;
			if (!key) {
				return match;
			}

			let resolved: string | undefined;

			if (isObjectForm) {
				const params = args[0] as Record<string, string | number | null | undefined>;
				const raw = params[key];
				resolved = raw === undefined || raw === null || raw === "" ? undefined : String(raw);
			} else {
				resolved = nextPositional();
			}

			return resolved ?? match;
		});
	}

	let positionalIndex = 0;
	const nextPositional = (): string | undefined => {
		if (positionalIndex >= args.length) {
			return undefined;
		}
		const value = args[positionalIndex++] as string | number | null | undefined;
		if (value === undefined || value === null || value === "") {
			return undefined;
		}
		return String(value);
	};

	// `:param` placeholders first (API style), then `{param}` (nav style).
	let out = replaceColonPatterns(this, nextPositional);
	out = replaceBracePatterns(out, nextPositional);
	return out;
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
