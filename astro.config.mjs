import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import starlightImageZoom from 'starlight-image-zoom'
import mdx from '@astrojs/mdx';

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
						{ label: 'Architecture', link: '/general/architecture' },
						{ label: 'Database', link: '/general/database' },
						{ label: 'Monorepo', link: '/general/mono-repo' },
						{ label: 'Scripts', link: '/general/scripts' },
					],
				},
				{
					label: 'Web App',
					items: [
						{ label: 'Overview', link: '/web/overview/' },
						{ label: 'Environment Variables', link: '/web/env/' },
						{ label: 'App versions', link: '/web/app-versions/' },
						{ label: 'Demo', link: '/web/demo/' },
						{ label: 'Sensor Data Sequences', link: '/web/sequences/' },
						{ label: 'Devices', link: '/web/devices/' },
						{ label: 'Suggestions', link: '/web/suggestions/' },
						{ label: 'Reports', link: '/web/reports/' },
						{ label: 'Logging', link: '/web/logging/' },
					],
				},
				{
					label: 'Admin App',	
					items: [
						{ label: 'Overview', link: '/admin/overview/' },
						{ label: 'Environment Variables', link: '/admin/env/' },
						{ label: 'User Management', link: '/admin/user-management/' },
						{ label: 'Sensor Management', link: '/admin/sensor-management/' },
						{ label: 'E-Mails', link: '/admin/mails/' },
					]
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
		mdx(),
	],
});
