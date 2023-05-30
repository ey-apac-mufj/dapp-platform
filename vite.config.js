import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		nodePolyfills({
			global: true,
		}),
	],
	define: {
		'process.env': {},
	},
	build:{//この部分を追加
    outDir:"./build"
  },
  server:{
    host:'0.0.0.0'
  }
});
