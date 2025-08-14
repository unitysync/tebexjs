import { build } from 'esbuild'

const buildAll = async () => {
	console.log('Building tbx.js for ESM...')

	await build({
		entryPoints: ['./src/index.ts'],
		bundle: true,
		outfile: './dist/esm/index.js',
		platform: 'neutral',
		target: 'esnext',
		format: 'esm',
	})

	console.log('Building tbx.js for CJS...')

	await build({
		entryPoints: ['./src/index.ts'],
		bundle: true,
		outfile: './dist/cjs/index.js',
		platform: 'neutral',
		target: 'esnext',
		format: 'cjs',
	})
}

buildAll().catch(console.error)
