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
						{ label: 'Overview', link: '/web/overview/' }						
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
					autogenerate: { directory: 'ml_api' },
				}
			],
			customCss: ['./src/tailwind.css'],
			plugins: [starlightImageZoom()],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});
