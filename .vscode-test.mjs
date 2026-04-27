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
			maxDiffSize: 48000
		}
	}
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
