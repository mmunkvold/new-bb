import { createRouter, createWebHistory } from 'vue-router';
import { redirectMap } from './redirects';
import metadata from '@/meta';
import HomePage from '@/views/HomePage.vue';
import NotFound from '@/components/notifications/NotFound.vue';
import NetworkError from '@/components/notifications/NetworkError.vue';

const routes= [
        {
            path: '/',
            name: 'hjem',
            component: HomePage,
            meta: metadata.hjem
        },
        {
            path: '/om-oss',
            name: 'om-oss',
            component: () => import('../views/AboutPage.vue'),
            meta: metadata['om-oss']
        },
        {
            path: '/etiske-retningslinjer',
            name: 'etiske-retningslinjer',
            component: () => import('../views/EthicalGuidelinesPage.vue'),
            meta: metadata['etiske-retningslinjer']
        },
        {
            path: '/kontakt-oss',
            name: 'kontakt-oss',
            component: () => import('../views/ContactPage.vue'),
            meta: metadata['kontakt-oss']
        },
        {
            path: '/bestill-provetime',
            name: 'bestill-provetime',
            component: () => import('../views/BookTimePage.vue'),
            meta: metadata['bestill-provetime']
        },
        {
            path: '/personvern',
            name: 'personvern',
            component: () => import('../views/PrivacyPolicyPage.vue'),
            meta: metadata.personvern
        },
        {
            path: '/arrangementer',
            name: 'arrangementer',
            component: () => import('../views/ActivitiesPage.vue'),
            meta: metadata.arrangementer
        },
        {
            path: '/blogg',
            name: 'blogg',
            component: () => import('../views/BlogPage.vue'),
            meta: metadata.blogg
        },
        {
            path: "/blogg/:slug", 
            name: "blogg-post",
            component: () => import('../views/BlogPostPage.vue'),
            props: true,
        }, 
        {
            path: '/bruker',
            name: 'bruker',
            component: () => import('../views/GuideUserPage.vue'),
            meta: metadata.bruker
        },{
            path: '/terapeut',
            name: 'terapeut',
            component: () => import('../views/GuideTerapeutPage.vue'),
            meta: metadata.terapeut
        },
        {
            path: '/tilbakemeldinger',
            name: 'tilbakemeldinger',
            component: () => import('../views/TestimonialsPage.vue'),
            meta: metadata.tilbakemeldinger
        },
        {
            path: '/tilbehor',
            name: 'tilbehor',
            component: () => import('../views/AddonsPage.vue'),
            meta: metadata.tilbehor
        },
        {
            path: '/tilbehor/:id',
            name: 'tilbehor-detalj',
            component: () => import('../views/AddonsPage.vue'),
            props: true
        }, 
        {
            path: '/teknisk-info',
            name: 'teknisk-info',
            component: () => import('../views/TechnicalInfoPage.vue'),
            meta: metadata['teknisk-info']
        },
        {
            path: '/hvordan-soke-hjelpemidler',
            name: 'hvordan-soke-hjelpemidler',
            component: () => import('../views/HowToApplyPage.vue'),
            meta: metadata['hvordan-soke-hjelpemidler']
        },
        {
            path: '/produkter',
            name: 'produkter',
            component: () => import('../views/ProductsPage.vue'),
            meta: metadata['produkter']
        },
        {
            path: '/produkt/:slug',
            name: 'produkt',
            component: () => import('../views/ProductPage.vue'),
            props: true
        },        
        {
            path: '/404/:resource',
            name: '404Resource',
            component: NotFound,
            props:true
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/network-error',
            name: 'NetworkError',
            component: NetworkError,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
            beforeEnter: (to, from, next) => {
              const requestedPath = to.path.endsWith('/') && to.path.length > 1 
                    ? to.path.slice(0, -1) 
                    : to.path;
              const redirect = redirectMap.find(r => r.oldPath === requestedPath);
        
              if (redirect) {
                next({ path: redirect.newPath, replace: true }); 
              } else {
                next(); 
              }
            }
        }
    ]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { el: to.hash };
        }
        return { top: 0 };
    }   
})

export default router
