import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', "resources/css/lp-custom-new.css", 'resources/js/app.jsx', "resources/js/sequence.jsx",],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
