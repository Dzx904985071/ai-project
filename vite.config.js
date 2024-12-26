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
				target: '接口地址',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/api/, '')
				}
			},
			
		}
	}
})
