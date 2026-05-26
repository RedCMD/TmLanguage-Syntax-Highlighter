// @ts-check

import { defineConfig } from '@vscode/test-cli';

/**
 * @satisfies {Parameters<typeof import('@vscode/test-cli').defineConfig>[0]}
 */
export const config = {
	files: 'out/test/**/*.test.js',
	workspaceFolder: './src/test/',
	mocha: {
		reporterOptions: {
			maxDiffSize: 32768
		}
	},
	launchArgs: [
		"--disable-extension ms-vscode.js-debug" // is disabled in VSCode Web
	],
};

export default defineConfig(
	{
		label: 'RunTests',
		...config,
		env: {
			updateTests: "false",
		},
	}
);
