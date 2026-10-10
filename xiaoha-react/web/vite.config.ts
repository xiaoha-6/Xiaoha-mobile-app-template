import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:'./',plugins:[react()],server:{port:5192,strictPort:true},build:{sourcemap:false,outDir:'dist',emptyOutDir:true}});
