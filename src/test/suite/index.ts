// Imports mocha for the browser, defining the `mocha` global.
require('mocha/mocha');

export function run(): Promise<void> {
	return new Promise((c, e) => {
		mocha.setup({
			ui: 'tdd',
			reporter: undefined,
			timeout: 30000,
			color: true,
			inlineDiffs: true,
			slow: 1000,
		});

		// Bundles all files in the current directory matching `*.test`
		const importAll = (r: __WebpackModuleApi.RequireContext) => r.keys().forEach(r);
		importAll(require.context('.', true, /\.test$/));

		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(err);
		}
	});
}
