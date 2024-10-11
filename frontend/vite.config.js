import { defineConfig } from 'vite';
import { join } from "node:path"

export default defineConfig({
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../../backend/dist',
        emptyOutDir: true,
        rollupOptions:{
            input:{
                main: join(import.meta.dirname,'src/index.html'),
                auth: join(import.meta.dirname,'src/auth.html'),
                register: join(import.meta.dirname,'src/register.html'),
            }
        }
    },
    server: {
        proxy: {
            '/': 'http://localhost:8000',
        },
    },
});
