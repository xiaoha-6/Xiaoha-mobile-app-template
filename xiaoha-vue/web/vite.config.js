import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({base:'./',plugins:[vue()],server:{port:5193,strictPort:true},build:{sourcemap:false,outDir:'dist',emptyOutDir:true}});
