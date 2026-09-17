# Spec: Migrate Swirl from Yarn 1.22.22 to Yarn 4.18.0

**Status:** Ready for implementation
**Date:** 2026-09-17
**Linear:** [COR-2286](https://linear.app/flip/issue/COR-2286/swirl-set-min-release-age-for-yarn-dependencies)
**Related:** [FLO-788](https://linear.app/flip/issue/FLO-788/set-minimum-release-age-for-npm-dependencies)

## Why

COR-2286 asks for a minimum release age on npm dependencies, as a supply-chain
guard. Swirl cannot do this today:

- Swirl runs Yarn 1.22.22 (Classic). `package.json` sets
  `"packageManager": "yarn@1.22.22"`.
- The native gate, `npmMinimalAgeGate`, requires Yarn >= 4.10. Yarn Classic has
  no equivalent.
- An `.npmrc` `minimumReleaseAge` entry has no effect: it is an npm CLI
  install-time setting, and Yarn Classic reads `.npmrc` only for registry and
  auth values.
- A Dependabot `cooldown` would be dead configuration: it applies to version
  updates only, and `.github/dependabot.yml` sets
  `open-pull-requests-limit: 0`, so only security updates are active.

So the Yarn 4 migration is a prerequisite, and it is the entire scope of this
spec. **Turning the gate on is a separate, follow-up PR** — see "Explicitly out
of scope" below.

## Goal

Move the repo to Yarn 4.18.0 with **no change in observable behaviour**: same
resolved dependency tree, same builds, same tests, same publish flow. The only
intended difference is which binary runs `yarn`.

## Findings

All of the following were verified empirically on 2026-09-17 in a throwaway
worktree migrated to Yarn 4.18.0, not taken from documentation.

### What already works, unchanged

| Check | Result |
|---|---|
| `yarn install` (lockfile auto-converted, 24,555 -> 34,115 lines) | Pass, 2m48s, warnings only |
| `@getflip/swirl-tokens` build | Pass |
| `@getflip/swirl-icons` build (incl. native `ttf2woff2`) | Pass |
| `@getflip/swirl-components` `stencil:build` | Pass |
| `@getflip/swirl-components` spec tests | Pass — 106 suites, 14 snapshots (551 tests at the probe's commit; 587 on `origin/main`) |
| `@getflip/swirl-components-react` build | Pass |
| `@getflip/swirl-components-angular` build (`ng-packagr`) | Pass |
| `@getflip/bridge`, `@getflip/swirl-mcp` builds | Pass |
| `yarn lint` (all workspaces) | Pass |

The builds and the Stencil suite were re-run a second time from a **completely
clean** `node_modules`, under `CI=true` (so immutable) and with dependency
install scripts skipped — the state CI installs into. All passed, and the
install itself emitted no `YN0028`.

The converted lockfile resolves the same packages at the same versions: 3228
`name@version` pairs from the Yarn 1 lockfile, of which exactly 3 are absent
from the Yarn 4 lockfile — `string-width-cjs`, `strip-ansi-cjs` and
`wrap-ansi-cjs`, all npm *aliases* that Yarn 4 records under a different key,
not version changes.

One failure seen during investigation was **not** caused by Yarn 4 and is not
in scope:

- **swirl-docs tests.** Need `turbo run prebuild`, which needs the
  `NEXT_PUBLIC_ALGOLIA_*` secrets that CI supplies.

The Storybook build **was** genuinely broken by Yarn 4 — see breaking change
B7 below. An earlier pass of this investigation misattributed that break to
`ENAMETOOLONG`: Storybook encodes the absolute repo path into a virtual module
filename, and at the probe's scratchpad path that filename is 279 bytes, over
macOS's 255-byte `NAME_MAX` (at the real repo path it is 189 bytes and fine).
That path-length ceiling is real, but it was a red herring for *this* failure
— it is a hazard of building Storybook from a very deep checkout path in
general, unrelated to the vite-hoisting regression that actually broke the
build, which reproduces regardless of path length.

### Breaking changes that must be handled

**B1 — `changeset version` staleness the lockfile, and CI installs are
immutable.**

Yarn 4's lockfile keys workspace entries by the exact version dependents
request:

```
"@getflip/swirl-icons@npm:0.96.0, @getflip/swirl-icons@workspace:packages/swirl-icons":
```

Yarn 1's lockfile has **zero** workspace entries, so this problem does not
exist today. `.changeset/config.json` sets `updateInternalDependencies: patch`
and `updateInternalDependents: always`, and internal deps are pinned exact, so
every `changeset version` rewrites those pins.

`enableImmutableInstalls` defaults to **`true` when `CI=true`** (verified:
`true` under `CI=true`, `false` without). `changesets/action@v1` does not run
any package-manager install to refresh the lockfile.

Verified by simulating a version bump and installing:

```
$ CI=true yarn install
YN0028: The lockfile would have been modified by this install, which is
explicitly forbidden.
```

Without a fix, every "Version Packages" PR lands with a stale lockfile and
fails CI.

**B2 — `yarn install --ignore-scripts` is a hard error.**

```
Unknown Syntax Error: Unsupported option name ("--ignore-scripts").
```

Used in five places: `lint-test.yml:48`, `publish.yml:32`, `publish.yml:76`,
`build-deploy.yml:31`, `sonarqube.yml:18`.

**B3 — Yarn 4 runs scripts through its own portable shell, not `sh`.**

Unmatched globs are fatal. This breaks `apps/swirl-docs` `prebuild`:

```
swirl-docs:prebuild: No matches found: "specs/**"
```

A full scan of every script in every workspace found exactly two using shell
features Yarn's shell treats differently:

- `apps/swirl-docs` `prebuild`: `rm -rf specs/**` — **breaks**. Changing it to
  `rm -rf specs` fixes it (verified: prebuild then runs to completion, failing
  only on the missing Algolia env vars).
- `packages/swirl-components` `lint`: `eslint src/**/*{.ts,.tsx}` — **works**,
  because the glob matches real files. Note Yarn expands it itself rather than
  passing it through. Brace expansion over a pattern that matches nothing is an
  error (`Note: Brace expansion of arbitrary strings isn't currently
  supported`), so this is fragile but correct today. Leave it alone.

**B4 — Yarn 4 does not run arbitrary `pre`/`post` scripts.**

Verified directly: given `prebuild`/`build`/`postbuild`, Yarn 1 runs all three,
Yarn 4 runs only `build`. Only `preinstall`/`install`/`postinstall` still fire
automatically.

Affected:

- Root `"prebuild": "patch-package"` — already a no-op. `patches/` held
  `@stencil+core+4.18.1.patch` and `pdfjs-dist+2.16.105.patch` until commit
  `8e54adba` ("Update StencilJS to 4.35.0 (#1063)") deleted both; the
  `patch-package` dependency and the `prebuild` hook were left behind.
  `patch-package` and `postinstall-postinstall` can both be dropped.
- `apps/swirl-docs` `prebuild`/`postbuild` — these **silently stop firing**
  when turbo invokes `yarn run build`. Today `yarn build` at the repo root
  generates the API docs data as a side effect; after the migration it would
  not. `prebuild` is re-attached via `turbo.json`'s `swirl-docs#build` task
  (Task 2). `postbuild` is deliberately **not** re-attached — see D5.
- `apps/swirl-docs/Dockerfile` is unaffected: its build context is
  `apps/swirl-docs`, so it never sees the root `.yarnrc.yml` and keeps running
  Alpine's Yarn 1.

**B5 — CI must actually get Yarn 4.**

`build-deploy.yml` and `sonarqube.yml` have no `setup-node` step at all, so
they use the runner's preinstalled Yarn 1. Setting only `packageManager` does
**not** switch them — verified, bare `yarn --version` still reported `1.22.22`.

Committing `.yarn/releases/yarn-4.18.0.cjs` and setting `yarnPath` does work:
Yarn 1 detects `yarnPath` and delegates. Verified — bare `yarn --version` then
reports `4.18.0`, with no `corepack enable` anywhere. Cost: 3.7 MB in git.
`.gitignore` already covers `.yarn/cache`, `.yarn/unplugged`,
`.yarn/build-state.yml` and `.yarn/install-state.gz`, and does **not** ignore
`.yarn/releases` (verified with `git check-ignore`).

**B6 — `figma-to-style-dictionary.yml` pins Node 16.** Yarn 4.18.0 requires
Node >= 18.12.

**B7 — Yarn 4's hoisting broke the Storybook build via a peer-dependency
violation, misdiagnosed at first as a `chai` problem.**

`@storybook/builder-vite@10.2.11` declares `vite` only as a peerDependency
(`^5.0.0 || ^6.0.0 || ^7.0.0`), with no `dependencies.vite` of its own. This
repo pins two vite majors across workspaces — `packages/swirl-components`
devDependency `vite@5.4.0`, `packages/swirl-components-react` `vite@3.2.10`
(transitively). Yarn 1 nested a `vite@5.4.0` directly under `builder-vite`;
Yarn 4's node-modules linker instead hoists `builder-vite` to the repo root,
where the only `vite` available is `3.2.10` — violating builder-vite's peer
range.

Vite 3's bundled esbuild then rejects a `0n` BigInt literal it encounters in
bundled `chai@4.4.0`, which is what the build actually threw on — making the
symptom look like a `chai` regression. It is not: `chai` resolves to identical
versions in both the Yarn 1 and Yarn 4 lockfiles, so it was a red herring, and
the two vite majors already coexisted under Yarn 1 without incident, since
Yarn 1's hoisting never put the wrong one where builder-vite could find it.

**Fix:** a `packageExtensions` entry in `.yarnrc.yml` gives
`@storybook/builder-vite` a real `dependencies.vite: "5.4.0"`. This corrects
the manifest Yarn resolves against without changing anything else about the
physical layout — `pdfjs-dist` in particular stays hoisted at the root, where
`packages/swirl-components/stencil.config.ts` (its `copy` output target) reads
it from `../../../node_modules/pdfjs-dist`.

A first attempt used `installConfig.hoistingLimits: workspaces` on
`swirl-components` instead. It was rejected: it fixed Storybook, but it also
unhoisted `pdfjs-dist`, which broke `stencil:build`.

Because the extension declares `vite` under `dependencies` rather than
resolving the existing hoisted copy, Yarn materialises a **second physical
copy** at `node_modules/@storybook/builder-vite/node_modules/vite` (confirmed:
`5.4.0`, matching the pin). This is a known, accepted duplication — see the
sync-instruction comment added to `.yarnrc.yml` alongside the extension.

**B8 — Yarn 4 lets `@modelcontextprotocol/sdk`'s peer dependency on `zod` win over `swirl-mcp`'s own pin, breaking `@getflip/swirl-mcp` at runtime; the fix is a deliberate, documented dependency-version change.**

`@modelcontextprotocol/sdk@1.27.1` declares `zod` as **both** a `dependencies`
entry and a `peerDependencies` entry, range `^3.25 || ^4.0`.
`packages/swirl-mcp/package.json` pinned `zod: "3.24.0"`, which violates that
range.

- **Under Yarn 1** the SDK got its own nested copy, isolated from the
  violation: `packages/swirl-mcp/node_modules/@modelcontextprotocol/sdk/node_modules/zod`
  resolved to **4.3.6** (confirmed by rebuilding the pre-migration tree at
  `c29231e7` and resolving from the SDK's own directory).
- **Under Yarn 4** the node-modules linker instead lets the peer win, resolved
  from the parent workspace: the SDK resolves `zod` to the hoisted root copy,
  which is `swirl-mcp`'s own pinned **3.24.0** — a version that has no `./v4`
  export. `zod@4.3.6` still appears in `yarn.lock` (pulled in elsewhere) but
  is installed nowhere the SDK can reach.
- **Runtime symptom:**
  ```
  ERR_PACKAGE_PATH_NOT_EXPORTED: Package subpath './v4' is not defined by
  "exports" in node_modules/zod/package.json imported from
  node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
  ```
- It builds and type-checks clean, which is why an earlier review pass of
  this migration misclassified this as pre-existing skew — only running
  `swirl-mcp` exposes it.

**Fix:** bump `packages/swirl-mcp`'s own `zod` pin from `3.24.0` to
`3.25.76`. That version satisfies the SDK's `^3.25 || ^4.0` peer range and
exposes the `./v4` subpath the SDK's ESM build imports (verified against the
npm registry for both `3.25.0` and `3.25.76`), while staying a minor bump
inside zod 3 rather than a major jump to zod 4. `swirl-mcp`'s own source
imports only `from "zod"` (the root export, verified by grep across
`packages/swirl-mcp/src`), so the bump does not touch what its own code uses.

This is the one deliberate, documented exception to "no dependency versions
change in this PR" (Requirement 3 below, and the plan's Global Constraints):
Yarn 1 was silently installing a `zod` version `swirl-mcp`'s own manifest
never declared compatible with what its SDK dependency requires; Yarn 4
surfaces that real constraint instead of masking it, and the honest repair is
to correct the manifest, not to try to reproduce Yarn 1's nested-copy masking.

### Non-issues, confirmed

- **OIDC trusted publishing survives.** `@changesets/cli@2.24.3`'s
  `getPublishTool()` special-cases only pnpm; everything else gets
  `npm publish`. The `npx npm@11` + OIDC setup in `publish.yml` is untouched.
- **The age gate does not disturb existing lockfiles.** With
  `npmMinimalAgeGate: "3d"` and a complete lockfile, `CI=true yarn install`
  passes. The gate only applies at resolution time (`yarn add`, `yarn up`, a
  changed range).
- **No git-protocol dependencies.** Zero in either lockfile, so the
  `approvedGitRepositories: ["**"]` wildcard that Yarn's migration writes is
  unnecessary and must be removed.

### Decisions

**D1 — Pin Yarn via `yarnPath` plus a committed release binary**, not corepack.
Two workflows have no Node setup step, and `yarnPath` makes every entry point
work identically without touching them. See B5.

**D2 — Set `enableScripts: true` and translate the CI flag to
`--mode=skip-build`**, rather than setting `enableScripts: false` globally and
dropping the flag.

This keeps the migration strictly behaviour-preserving, which is the point of
this PR. Yarn 1 today runs dependency install scripts on a local `yarn install`
and skips them in CI via `--ignore-scripts`. The chosen config reproduces that
split exactly:

| | Yarn 1 today | Yarn 4 after this PR |
|---|---|---|
| Local `yarn install` | runs install scripts | runs install scripts (`enableScripts: true`) |
| CI | `--ignore-scripts` | `--mode=skip-build` |

Verified: with `enableScripts: true`, a local `yarn install` builds 16 packages
(`esbuild` ×7, plus `ttf2woff2`, `puppeteer`, `lmdb`, `msgpackr-extract`,
`@parcel/watcher`, `core-js-pure`, `es5-ext`, `highlight.js` and
`postinstall-postinstall`), reported as `YN0007`. With
`CI=true yarn install --mode=skip-build`, the Link step completes with no
builds and no `YN0028`.

Note that Yarn caches build state, so a *second* `yarn install` reports zero
builds. `yarn rebuild` forces them and is the repeatable way to check — it
reports the same 16 every time.

The stricter posture (`enableScripts: false` everywhere) was also verified to
work — a from-scratch install with scripts disabled still builds tokens, icons,
`stencil:build`, React and Angular, and passes the Stencil suite 106/106, and
`swirl-icons`' native `ttf2woff2` dependency builds fine even after deleting
its compiled artifacts. It is a reasonable future cleanup, but it changes local
behaviour and so is out of scope here.

**D3 — Keep `npmMinimalAgeGate: 0` in this PR.** Yarn 4.18.0 defaults it to
`1d`, and Yarn's own migration writes `npmMinimalAgeGate: 0` to preserve Yarn 1
behaviour. Keeping the explicit `0` makes this PR a pure package-manager
change and keeps the security change reviewable on its own. The follow-up PR
changes one line.

**D4 — Accept the `package.json` normalisations Yarn writes.** `yarn install`
rewrites four files: it collapses single-entry `bin` objects to strings, drops
an empty `dependencies: {}`, and reorders one `devDependencies` block. The
`bin` change is semantically identical — npm derives the command name from the
unscoped package name. Commit these deliberately rather than fighting them.

**D5 — Re-attach `prebuild` through turbo (Task 2); leave `postbuild`
explicit-only.** `apps/swirl-docs`'s `postbuild` (`tsx
src/scripts/postbuild.ts`) calls `sendDataToAlgolia(...)`, publishing to the
**live** Algolia search index. Wiring it into `turbo.json`'s `swirl-docs#build`
alongside `prebuild` would make it fire from `turbo run build` again — but that
is not wanted:

- No CI path regresses without it. `build-deploy.yml` builds with
  `--filter=!swirl-docs`; `publish.yml` uses `build:packages`; `lint-test.yml`
  only builds tokens. No workflow runs `turbo run build` for swirl-docs.
- `apps/swirl-docs/Dockerfile` calls `yarn postbuild` explicitly as its own
  step, and its build context is `apps/swirl-docs`, so it never sees the root
  `.yarnrc.yml` and keeps running Yarn 1. The production path that actually
  populates the search index is unaffected by this migration.
- A developer's local `yarn build` silently mutating the production search
  index is a hazard, not a feature Yarn 1 gave us on purpose to keep. Restoring
  it through turbo would restore that hazard for everyone who runs `yarn build`
  at the root.

So `postbuild` stays exactly what B4 made it: invoked explicitly, by
`Dockerfile`'s `RUN yarn postbuild` in production and by `yarn postbuild`
locally if someone wants to refresh the index by hand.

## Requirements

1. `packageManager` is `yarn@4.18.0`; `.yarn/releases/yarn-4.18.0.cjs` is
   committed; `yarnPath` points at it.
2. `.yarnrc.yml` sets `nodeLinker: node-modules`, `enableScripts: true`,
   `npmMinimalAgeGate: 0`. It does **not** set `approvedGitRepositories`.
3. `yarn.lock` is converted to Yarn 4 format (`__metadata: version 10`) with no
   dependency version changes, with one deliberate, documented exception:
   `packages/swirl-mcp`'s `zod` pin, `3.24.0` → `3.25.76` — see B8.
4. No workflow passes `--ignore-scripts`; each passes `--mode=skip-build`
   instead, preserving today's behaviour.
5. `figma-to-style-dictionary.yml` runs on Node >= 18.12.
6. The release flow refreshes `yarn.lock` after `changeset version`, so the
   Version Packages PR is installable under an immutable CI install.
7. `apps/swirl-docs` `prebuild` runs to completion under Yarn's shell.
8. `prebuild` is re-attached via turbo, so `turbo run build` still produces
   swirl-docs' generated API docs data despite B4. `postbuild` is **not**
   re-attached and stays explicit-only — see B4 and D5 for why.
9. `README.md` tells a new contributor how to get the right Yarn.
10. Builds, lint and the Stencil spec suite pass.

## Explicitly out of scope

- **Turning on the release-age gate.** Follow-up PR: set
  `npmMinimalAgeGate: "3d"` and `npmPreapprovedPackages: ["@getflip/*"]`. Both
  were verified to work — an unpinned `yarn add rollup` skipped a version
  published 2.8 days earlier and took the older one, a pinned
  `yarn add rollup@4.63.3` failed with `YN0016: All versions satisfying
  "4.63.3" are quarantined`, and a preapproved glob let the same package
  through. Exempting a package does **not** exempt its transitive dependencies,
  which is the desired behaviour for `@getflip/*`.
- Switching `nodeLinker` to PnP or pnpm mode.
- Upgrading `@changesets/cli` (2.24.3, from 2022), Storybook, Stencil, Next.js
  or Angular.
- The peer-dependency warnings Yarn 4 surfaces (`YN0002`/`YN0060`). They are
  pre-existing, and Yarn 1 simply did not report them.
- `packages/error-code-generator`'s `release` script referencing `pnpm`.
- The `apps/swirl-docs/Dockerfile` copying only `package.json` and running
  `yarn install` without a lockfile.
