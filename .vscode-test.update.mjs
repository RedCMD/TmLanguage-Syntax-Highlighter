// @ts-check

import { defineConfig } from '@vscode/test-cli';
import { config } from './.vscode-test.mjs';

export default defineConfig(
	{
		label: 'UpdateTests',
		...config,
		env: {
			updateTests: "true",
		},
	}
);
