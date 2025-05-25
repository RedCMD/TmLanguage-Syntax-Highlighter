import * as fs from 'fs';
import * as path from 'path';


copyFile('../../src/Onigmo/Onigmo.js', 'Onigmo.js');
copyFile('../../src/Onigmo/Onigmo.wasm', 'Onigmo.wasm');

function copyFile(source: string, destination: string) {
	const src = path.join(__dirname, source);
	const dst = path.join(__dirname, destination);

	console.log(`Copying ${src} to ${dst}`);
	fs.writeFileSync(dst, fs.readFileSync(src));
}
