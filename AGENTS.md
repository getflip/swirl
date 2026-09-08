# AGENTS.md

## Cursor Cloud specific instructions

Swirl is a Yarn 1 (classic) + Turborepo monorepo of design-system packages (`packages/*`)
plus a Next.js docs site (`apps/swirl-docs`). There is no database/backend service. See
`README.md` for the package overview and standard commands.

### Environment
- Node 22 + Yarn 1.22 are the shipped defaults; `node` engines only require `>=14`. CI pins
  Node 20.x but the build/lint/tests work on Node 22 as well.
- Dependencies install via `yarn install` (already run by the startup update script).
- `puppeteer` (used by `swirl-components` Stencil e2e/spec tests) downloads Chromium on first
  install. That download is cached in `~/.cache/puppeteer` and persists in the VM snapshot, so
  later `yarn install` runs are fast no-ops. If a fresh install ever hangs on puppeteer's
  postinstall after Chromium is already cached, kill that one process and re-run with
  `PUPPETEER_SKIP_DOWNLOAD=true yarn install`.

### Build / lint / test (standard scripts, see `package.json` / `turbo.json`)
- Build the libraries with `yarn build:packages` (Turbo handles order: tokens & icons → components → react/angular). Avoid root `yarn build`: it also builds `swirl-docs`, whose `prebuild` fetches OpenAPI specs from a private GitLab repo and fails without secrets.
- `yarn lint` and `yarn test` work out of the box for the library packages.

### Running the product (dev)
- `yarn dev` (root) is the primary dev experience: it runs the `swirl-components` Stencil watch
  build + Storybook on http://localhost:6006, plus tokens/icons/bridge watchers. It excludes
  docs/angular/react. Storybook takes ~30-60s to come up; wait for "Local: http://localhost:6006/".
- During `yarn dev` startup the `bridge` watcher may briefly print TS2306 errors against
  `swirl-components` type output; these clear themselves once Stencil finishes generating types.

### Known limitations (need secrets)
- `apps/swirl-docs` is OPTIONAL and is excluded from the CI lint/test workflow. Its `prebuild`,
  `next dev` (`yarn dev:docs`), build, and `vitest` tests require `GITLAB_ACCESS_TOKEN`,
  `GITLAB_FLIP_REPO_ID` (OpenAPI specs) and Algolia keys. Without them, the docs `vitest` run
  hangs/fails — run `yarn test --filter='!swirl-docs'` to test just the library packages.
