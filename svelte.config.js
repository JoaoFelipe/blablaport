import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// options passed to svelte.compile (https://svelte.dev/docs#svelte_compile)
	compilerOptions: null,

	// an array of file extensions that should be treated as Svelte components
	extensions: ['.svelte'],

	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		amp: false,
		appDir: '_app',
		files: {
			assets: 'static',
			hooks: 'src/hooks',
			lib: 'src/lib',
			routes: 'src/routes',
			serviceWorker: 'src/service-worker',
			template: 'src/app.html'
		},
		floc: false,
		//host: null,
		//hostHeader: null,
		hydrate: true,
		paths: {
			assets: '/blablaport',
			base: '/blablaport'
		},
		prerender: {
			crawl: true,
			enabled: true,
			force: false,
			pages: ['*']
		},
		router: true,
		ssr: true,
		target: "#svelte",
		trailingSlash: 'never',
		vite: () => ({})
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: preprocess()
};

export default config;
