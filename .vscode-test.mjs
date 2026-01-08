// @ts-check

import { defineConfig } from '@vscode/test-cli';

export const config = {
	files: 'out/test/**/*.test.js',
	workspaceFolder: './src/test/',
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
