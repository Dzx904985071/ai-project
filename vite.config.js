import {
	defineConfig
} from "vite"
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
	plugins: [
		uni()
	],
	server: {
		proxy: {
			'/api': {
				target: 'http://www.bobogame.vip/',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/api/, '')
				}
			}
		}
	}
})
