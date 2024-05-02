# Energyleaf Docs

## 🔍 Focus

This documentation is focused on the technical design and functionality of the Energyleaf system. Therefore, it is not suitable for end users, but is aimed at people with technical knowledge.

In terms of content, this documentation avoids going into the specific implementation of the processes and functionalities in the code. Instead, it describes how these functionalities work conceptually (e.g. in the form of diagrams). If you are interested in the concrete implementation, please take a look at our code on [GitHub](https://github.com/pgenergy). 

## 🚀 Project Structure

Inside the "Energyleaf Docs" project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

It looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 📄 Documentation Structure
This documentation consists of the following chapters:
- General
    - Person in charge: [@Big0x44](https://github.com/Big0x44)
- Web App
    - Person in charge: [@Big0x44](https://github.com/Big0x44)
- Admin App
    - Person in charge: [@Big0x44](https://github.com/Big0x44)
- Web API
    - Person in charge: [@m43i](https://github.com/m43i)
- Sensors
    - Person in charge: [@SlepiK](https://github.com/SlepiK)
- ML-API
    - Person in charge: [@lhoeke](https://github.com/lhoeke)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build).
