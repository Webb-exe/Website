# Astro Starter Kit: Minimal

```sh
bun create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`       | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## Mixpanel analytics

The site's public project token is configured in
`src/components/shared/Analytics.astro`, so production deployments work without
additional environment setup. To override it, copy `.env.example` to `.env` and
set `PUBLIC_MIXPANEL_TOKEN`, or set that variable in your hosting provider's build
environment. An explicitly empty value disables tracking. Rebuild and deploy
after changing the value; Astro embeds public environment variables at build
time. Never use a Mixpanel API secret here.

The shared layout tracks page views (including Astro client-side navigation),
clicks, and scroll depth using the [Mixpanel browser SDK](https://docs.mixpanel.com/docs/tracking-methods/sdks/javascript).
Form input tracking, form submission tracking, text capture, and session recording
are disabled. Existing Umami analytics remains enabled.

Tracking runs only in production builds with a non-empty token. To verify locally,
run `bun run build` and `bun preview`, visit a few pages, and check Mixpanel's Events
view for `$mp_web_page_view` events with the expected URLs and titles. Each page
load or client-side navigation should produce one page-view event. `bun dev`
and builds with an explicitly empty token do not send Mixpanel events.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
