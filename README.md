# WattToken

WattToken mobile and web application.

## Web

Start the web app locally:

```sh
npm run web
```

Create a production web build:

```sh
npm run build:web
```

The production output is written to `web-build/`.

## GitHub Pages

The web app is deployed from `main` by GitHub Actions and is available at:

https://watttoken-ipme.github.io/WattToken/

Before the first deployment, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** in the repository settings. Subsequent pushes to `main` deploy automatically. The workflow can also be started manually from the Actions tab.
