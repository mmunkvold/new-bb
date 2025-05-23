import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Sitemap from 'vite-plugin-sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

async function getDynamicRoutes(env) {
    const routes = [];
    const hostname = env.VITE_SITE_URL || 'https://quality-care.no'; 

    try {
        const productsPath = fileURLToPath(new URL('./public/data/products.json', import.meta.url));
        if (fs.existsSync(productsPath)) {
            const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
            productsData.forEach(product => {
                if (product.slug && product.status === 'published') {
                    routes.push(`${hostname}/produkt/${product.slug}`);
                }
            });
        } else {
            console.warn('Sitemap: Filen public/data/products.json ble ikke funnet.');
        }
    } catch (productError) {
        console.warn(`Sitemap: Kunne ikke laste eller parse products.json: ${productError.message}`);
    }
    
    const wpBaseUrl = env.VITE_WP_API_BASE_URL || 'https://blog.quality-care.no';
    try {
        const postsResponse = await fetch(`${wpBaseUrl}/wp-json/wp/v2/posts?per_page=100&status=publish&_fields=slug`);
        if (postsResponse.ok) {
            const posts = await postsResponse.json();
            posts.forEach(post => {
                if (post.slug) {
                    routes.push(`${hostname}/blogg/${post.slug}`); 
                }
            });
        } else {
            console.warn(`Sitemap: Kunne ikke hente blogginnlegg, status: ${postsResponse.status}`);
        }
    } catch (fetchError) {
        console.warn(`Sitemap: Feil ved henting av blogginnlegg: ${fetchError.message}`);
    }
    return routes;
}

export default defineConfig(async ({ mode }) => { 
    const env = loadEnv(mode, process.cwd(), '');
    const dynamicSiteRoutes = await getDynamicRoutes(env);

    return {
        plugins: [
            vue(),
            tailwindcss(),
            Sitemap({
                hostname: env.VITE_SITE_URL || 'https://quality-care.no',
                dynamicRoutes: dynamicSiteRoutes,
                // staticRoutes: ['/', '/om-oss', '/kontakt-oss', '/tilbehor', '/arrangementer', '/teknisk-info'], // Kan ofte utelates
                // robots: [{ userAgent: '*', allow: '/' }], // Valgfritt
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    };
});