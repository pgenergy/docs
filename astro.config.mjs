import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightImageZoom from 'starlight-image-zoom'

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Energyleaf Docs',
            logo: {
                src: './src/assets/logo.png',
            },
			social: {
				github: 'https://github.com/pgenergy/energyleaf',
			},
			sidebar: [
				{
					label: 'General',
					items: [
						{ label: 'Introduction', link: '/general/introduction' },
						{ label: 'Getting started', link: '/general/getting-started' },
						{ label: 'Architecture', link: '/general/architecture' },
						{ label: 'Database', link: '/general/database' }
					],
				},
				{
					label: 'Web App',
					items: [
						{ label: 'Overview', link: '/web/overview/' },
						{ label: 'Login', link: '/web/login/' },
						{ label: 'Sign-up', link: '/web/signup/' },
						{ label: 'Profile', link: '/web/profile/' },
						{ label: 'FAQ', link: '/web/faq/' },
						{ label: 'Dashboard', link: '/web/dashboard/' },
						{ label: 'Devices', link: '/web/devices/' },
						{ label: 'Recommendations', link: '/web/recommendations/' },
						
					],
				},
				{
					label: 'Admin App',	
					autogenerate: { directory: 'admin' },
				},
				{
					label: 'Web API',
					autogenerate: { directory: 'web_api' },
				},
				{
					label: 'Sensors',
					autogenerate: { directory: 'sensors' },
				},
				{
					label: 'ML API',
					items: [
						{ label: 'Overview', link: '/ml_api/overview/' },
						{ label: 'Structure', link: '/ml_api/structure/' },
						{ label: 'Data', link: '/ml_api/data/' },
						{ label: 'Model-training', link: '/ml_api/model_training/' },
						{ label: 'Hosting', link: '/ml_api/hosting/' },
					],
				}
			],
			customCss: ['./src/tailwind.css'],
			plugins: [starlightImageZoom()],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
