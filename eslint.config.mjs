import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
	{
		plugins: {
			perfectionist,
		},
		rules: {
			"perfectionist/sort-objects": "off",
			"perfectionist/sort-jsx-props": "off",
			"perfectionist/sort-interfaces": "off",
			"perfectionist/sort-object-types": "off",
		},
	},
]);

export default eslintConfig;
