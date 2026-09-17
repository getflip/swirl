# Yarn 4 Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the Swirl monorepo from Yarn 1.22.22 to Yarn 4.18.0 with no change in the resolved dependency tree, the builds, the tests, or the publish flow.

**Architecture:** Yarn 4 is pinned by committing `.yarn/releases/yarn-4.18.0.cjs` and pointing `yarnPath` at it, so the Yarn 1 binary already on every CI runner transparently delegates and no workflow needs `corepack enable`. The `node-modules` linker is kept, so the on-disk layout stays what every tool in the repo already expects. Four follow-on changes fix the things Yarn 4 genuinely does differently: install flags, its portable shell, its dropping of arbitrary `pre`/`post` scripts, and immutable installs colliding with `changeset version`.

**Tech Stack:** Yarn 4.18.0, Turborepo 2.9.18, Changesets 2.24.3, Stencil 4.43.1, Next.js 14, Angular 19, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-09-17-yarn-4-migration.md` — read it first. Every decision below (D1–D4) and every breaking change (B1–B6) is defined there, with the evidence.

## Global Constraints

- Yarn version is exactly **4.18.0**. Do not run `yarn set version latest` or `stable` — pin the number.
- Node version floor is **18.12** (Yarn 4.18.0's minimum). CI currently uses 20 and 22; one workflow uses 16 and must be raised.
- `nodeLinker` is **`node-modules`**. Do not use PnP or the pnpm linker.
- **No dependency versions change in this PR.** The lockfile is converted, not re-resolved. If any package version moves, stop and investigate.
- `npmMinimalAgeGate` stays **`0`** in this PR (D3). Turning the gate on is a separate follow-up PR.
- **The migration must be 100% behaviour-neutral** (D2). Local `yarn install` keeps running dependency install scripts (`enableScripts: true`); CI keeps skipping them (`--mode=skip-build`, replacing `--ignore-scripts`). Do not "simplify" this to `enableScripts: false` — that would change what developers get.
- Do **not** add `approvedGitRepositories` — the repo has zero git-protocol dependencies, and Yarn's automatic migration adds a `["**"]` wildcard that must be deleted.
- The Yarn 1 → Yarn 4 conversion rewrites four `package.json` files (D4). Those rewrites are expected; commit them, do not revert them.
- Run `yarn` (not `npx yarn`, not `corepack yarn`) once `yarnPath` is in place — the point of D1 is that bare `yarn` works.
- Commit after each task.

---

## Prerequisites

Branch from a freshly fetched `origin/main`. As of 2026-09-17 the local `main`
ref in this checkout is stale — `origin/main` carries two commits it does not
have, and the working branch sits on top of unmerged work. Do not branch from
whatever is currently checked out.

```bash
cd /Users/paulobernardes/getflip/swirl
git fetch origin
git status --short          # expect clean, apart from docs/superpowers/
git switch -c cor-2286-migrate-to-yarn-4 origin/main
git log --oneline -3
```

Expected: the branch is created from `origin/main`'s tip, and `git log` shows
`origin/main`'s most recent commits — not `feat(components): Remove
selectionMode...`.

The two documents this plan refers to (`docs/superpowers/specs/` and
`docs/superpowers/plans/`) are currently untracked. Carry them onto the new
branch and commit them first, so the PR explains itself:

```bash
git add docs/superpowers/
git commit -m "docs: add Yarn 4 migration spec and plan

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## File Structure

| File | Change | Responsible for |
|---|---|---|
| `.yarnrc.yml` | Create | Yarn 4 settings: linker, scripts policy, gate, `yarnPath` |
| `.yarn/releases/yarn-4.18.0.cjs` | Create (binary, 3.7 MB) | The pinned Yarn binary every entry point delegates to |
| `yarn.lock` | Rewrite | Converted to Yarn 4 format, same resolutions |
| `package.json` | Modify | `packageManager`, drop dead `patch-package` wiring, add `version:ci` |
| `packages/error-code-generator/package.json` | Modify (by Yarn) | `bin` normalisation |
| `packages/swirl-components-react/package.json` | Modify (by Yarn) | `devDependencies` key order |
| `packages/swirl-mcp/package.json` | Modify (by Yarn) | `bin` normalisation |
| `apps/swirl-docs/package.json` | Modify | `prebuild` glob that Yarn's shell rejects |
| `turbo.json` | Modify | Re-attach swirl-docs `prebuild` to its `build`, which Yarn no longer does implicitly |
| `.github/workflows/lint-test.yml` | Modify | Install flag |
| `.github/workflows/publish.yml` | Modify | Install flag (×2), lockfile refresh on version |
| `.github/workflows/build-deploy.yml` | Modify | Install flag |
| `.github/workflows/sonarqube.yml` | Modify | Install flag |
| `.github/workflows/figma-to-style-dictionary.yml` | Modify | Node 16 → 20 |
| `README.md` | Modify | Contributor setup instructions |
| `.changeset/*.md` | Create | Changeset for the release |
| `.yarnrc.yml` | Modify (Task 7) | `packageExtensions` fix for the Storybook builder-vite/vite peer mismatch (B7) |

---

### Task 1: Convert the repo to Yarn 4.18.0

This is the whole migration in one commit: after it, `yarn install` works and nothing else in the repo has been touched yet. Tasks 2–5 fix what this exposes.

**Files:**
- Create: `.yarnrc.yml`
- Create: `.yarn/releases/yarn-4.18.0.cjs`
- Modify: `yarn.lock` (full rewrite)
- Modify: `package.json` (`packageManager` field)
- Modify: `packages/error-code-generator/package.json`, `packages/swirl-components-react/package.json`, `packages/swirl-mcp/package.json` (written by Yarn, not by hand)
- Modify: `README.md:100-115`

**Interfaces:**
- Produces: a working `yarn` 4.18.0 at the repo root; `.yarn/releases/yarn-4.18.0.cjs` as the `yarnPath` target that Tasks 4 and 5 rely on for CI; a Yarn 4 lockfile whose workspace entries are keyed by exact internal version, which is what Task 5 exists to handle.

- [ ] **Step 1: Save the Yarn 1 lockfile as the baseline**

This is the regression test for "no dependency versions change". Copy it before touching anything.

```bash
cd /Users/paulobernardes/getflip/swirl
cp yarn.lock /tmp/yarn1-baseline.lock
head -3 /tmp/yarn1-baseline.lock
```

Expected: `# yarn lockfile v1` in the header. Keep this file until Step 8.

Also write the comparison script now, so it exists before the lockfile is overwritten. Create `/tmp/compare-locks.js`:

```javascript
// Compare the resolved package set of a Yarn 1 lockfile against a Yarn 4 lockfile.
// Usage: node compare-locks.js <yarn1.lock> <yarn4.lock>
const fs = require("fs");

const [, , v1Path, v4Path] = process.argv;

function parseV1(text) {
  const out = new Set();
  const blocks = text.split(/\n(?=\S)/);
  for (const block of blocks) {
    const header = block.split("\n")[0];
    if (!header.includes("@")) continue;
    const m = block.match(/^ {2}version:? "?([^"\n]+)"?$/m);
    if (!m) continue;
    for (const spec of header.replace(/:$/, "").split(", ")) {
      const name = spec.replace(/^"/, "").replace(/"$/, "").replace(/@[^@]*$/, "");
      if (name) out.add(name + "@" + m[1]);
    }
  }
  return out;
}

function parseV4(text) {
  const out = new Set();
  for (const m of text.matchAll(/^ {2}resolution: "(.+)@npm(?::|%3A)([^"]+)"$/gm)) {
    out.add(m[1] + "@" + m[2]);
  }
  return out;
}

const v1 = parseV1(fs.readFileSync(v1Path, "utf8"));
const v4 = parseV4(fs.readFileSync(v4Path, "utf8"));

const missing = [...v1].filter((p) => !v4.has(p)).sort();

console.log("yarn 1 name@version pairs:", v1.size);
console.log("yarn 4 name@version pairs:", v4.size);
console.log("in yarn 1 but NOT in yarn 4 at the same version:", missing.length);
for (const m of missing.slice(0, 50)) console.log("  ", m);
if (missing.length > 50) console.log("   ... and", missing.length - 50, "more");
```

- [ ] **Step 2: Write `.yarnrc.yml`**

Write it by hand *before* running the migration, so Yarn's auto-migration has less to invent. Create `.yarnrc.yml` at the repo root:

```yaml
# Keep the node_modules layout. Stencil, Next.js, Angular and Storybook all
# assume it; PnP is not in scope.
nodeLinker: node-modules

# Matches Yarn 1: local installs run dependency install scripts. CI skips them
# with --mode=skip-build, which is what --ignore-scripts did before.
enableScripts: true

# Yarn 4.18 defaults this to "1d". Pinned to 0 here so this PR is a pure
# package-manager change; the release-age gate is a separate PR (COR-2286).
npmMinimalAgeGate: 0
```

**Do not add `yarnPath` here.** Step 3 adds it, and it must not exist before
the binary it points at does — a `yarnPath` aimed at a missing file bricks
`yarn` completely:

```
Internal Error: ENOENT: no such file or directory, stat '.../.yarn/releases/yarn-4.18.0.cjs'
```

At that point even `yarn --version` crashes, and the only way out is editing
`.yarnrc.yml` back by hand.

- [ ] **Step 3: Download the pinned Yarn release**

```bash
cd /Users/paulobernardes/getflip/swirl
corepack yarn@4.18.0 set version 4.18.0 --yarn-path
```

Expected output:
```
➤ YN0000: Downloading https://repo.yarnpkg.com/4.18.0/packages/yarnpkg-cli/bin/yarn.js
➤ YN0000: Saving the new release in .yarn/releases/yarn-4.18.0.cjs
➤ YN0000: Done
```

This does three things: downloads the binary, appends `yarnPath` to
`.yarnrc.yml`, and sets `"packageManager": "yarn@4.18.0"` in `package.json`.

It also rewrites `.yarnrc.yml` with the keys alphabetised and blank-line
separated, so the file from Step 2 comes back reordered. That is cosmetic —
the settings and comments are preserved. Expected result:

```yaml
enableScripts: true

nodeLinker: node-modules

npmMinimalAgeGate: 0

yarnPath: .yarn/releases/yarn-4.18.0.cjs
```

- [ ] **Step 4: Verify bare `yarn` now delegates**

This is the load-bearing check for D1 — it is what lets the two workflows with no `setup-node` step work untouched.

```bash
cd /Users/paulobernardes/getflip/swirl && yarn --version
```

Expected: `4.18.0`, **not** `1.22.22`. If it prints `1.22.22`, `yarnPath` is missing or misspelled in `.yarnrc.yml` — fix it before continuing, because every later step depends on this.

- [ ] **Step 5: Convert the lockfile**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn install
```

Expected: `YN0087: Migrated your project to the latest Yarn version 🚀`, then resolution, fetch and link steps, ending in `Done with warnings`. Takes roughly 3 minutes. The `YN0002`/`YN0060` peer-dependency warnings are pre-existing and expected — Yarn 1 simply never reported them.

- [ ] **Step 6: Strip what the auto-migration added**

Yarn's migration rewrites `.yarnrc.yml` to preserve Yarn 1 behaviour. Most of what it writes is what this plan wants anyway — `enableScripts: true` and `npmMinimalAgeGate: 0` are both intentional here. Remove only this one, if present:

```yaml
approvedGitRepositories:      # DELETE — repo has zero git dependencies
  - "**"
```

It is a wildcard allowing any git repository to be fetched as a dependency, and nothing in this repo needs it. Leave `nodeLinker`, `enableScripts: true`, `npmMinimalAgeGate: 0` and `yarnPath` in place — the file should end up matching the Step 3 result exactly. Confirm:

```bash
cd /Users/paulobernardes/getflip/swirl
cat .yarnrc.yml
yarn config --json | node -e "
let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
  for(const l of s.split('\n')){ if(!l.trim())continue; let o; try{o=JSON.parse(l)}catch(e){continue}
    if(['nodeLinker','enableScripts','npmMinimalAgeGate','approvedGitRepositories'].includes(o.key))
      console.log(o.key,'=',JSON.stringify(o.effective??o.value));
  }})"
```

Expected:
```
approvedGitRepositories = []
enableScripts = true
nodeLinker = "node-modules"
npmMinimalAgeGate = 0
```

- [ ] **Step 7: Confirm local installs still run build scripts**

This is the check that the migration is behaviour-neutral for developers: Yarn 1 runs dependency install scripts on a local `yarn install`, and so must Yarn 4.

Use `yarn rebuild`, **not** a second `yarn install`. Step 5's install already built these packages and Yarn caches that, so re-running `yarn install` reports zero and tells you nothing. `yarn rebuild` forces the build scripts regardless of cache and is repeatable.

```bash
cd /Users/paulobernardes/getflip/swirl && yarn rebuild 2>&1 | grep -c "YN0007"
```

Expected: `16`. Broken down:

```bash
cd /Users/paulobernardes/getflip/swirl && yarn rebuild 2>&1 | grep "YN0007" | sed 's/.*│ //;s/@npm:.*//' | sort | uniq -c | sort -rn
```

Expected, exactly:

```
   7 esbuild
   1 ttf2woff2
   1 puppeteer
   1 postinstall-postinstall
   1 msgpackr-extract
   1 lmdb
   1 highlight.js
   1 es5-ext
   1 core-js-pure
   1 @parcel/watcher
```

If the count is `0`, `enableScripts` is `false` somewhere — recheck Step 6.

Note for later: Task 3 removes `postinstall-postinstall`, so after that task the count is **15**, not 16.

Two of these builds fail internally and that is pre-existing, not something to fix here: `ttf2woff2`'s `node-gyp` step writes a `builderror.log` and exits 0 by design (its install script ends `|| (exit 0)`), falling back to its JS implementation — which is why the icons build works in CI, where install scripts have never run at all.

- [ ] **Step 8: Verify no dependency version moved**

```bash
cd /Users/paulobernardes/getflip/swirl
node /tmp/compare-locks.js /tmp/yarn1-baseline.lock yarn.lock
```

Expected, verified against this exact repo state:

```
yarn 1 name@version pairs: 3228
yarn 4 name@version pairs: 3249
in yarn 1 but NOT in yarn 4 at the same version: 3
   string-width-cjs@npm:string-width@4.2.3
   strip-ansi-cjs@npm:strip-ansi@6.0.1
   wrap-ansi-cjs@npm:wrap-ansi@7.0.0
```

Those three are npm *aliases* (`"string-width-cjs": "npm:string-width@^4.2.0"`), which Yarn 4 records under a different key — not version changes. The yarn-4 count is higher because Yarn 4 also records the 22 workspace entries.

Anything else in the list means the lockfile re-resolved a real dependency. **Stop and investigate before committing** — this PR must not move any version.

- [ ] **Step 9: Confirm the lockfile is stable and CI-installable**

```bash
cd /Users/paulobernardes/getflip/swirl && CI=true yarn install
```

Expected: `Done with warnings`, and **no** `YN0028`. `CI=true` turns on immutable installs, so this proves the committed lockfile matches the manifests exactly.

- [ ] **Step 10: Review the `package.json` rewrites**

```bash
cd /Users/paulobernardes/getflip/swirl && git diff -- '*package.json'
```

Expected, and all to be kept (D4):
- `package.json`: `packageManager` 1.22.22 → 4.18.0; empty `"dependencies": {}` dropped.
- `packages/error-code-generator/package.json`: `"bin": {"error-code-generator": "./dist/cli.js"}` → `"bin": "./dist/cli.js"`.
- `packages/swirl-mcp/package.json`: `"bin": {"swirl-mcp": "dist/transports/stdio.js"}` → `"bin": "dist/transports/stdio.js"`.
- `packages/swirl-components-react/package.json`: `typescript` moved in `devDependencies`.

Both `bin` rewrites are semantically identical — with a string `bin`, the command name is the package's unscoped name, which is what the object form spelled out. Confirm that reasoning holds for both:

```bash
cd /Users/paulobernardes/getflip/swirl
node -e "
for (const f of ['packages/error-code-generator/package.json','packages/swirl-mcp/package.json']) {
  const p=require('./'+f);
  console.log(f, '-> command name:', p.name.replace(/^@[^/]+\//,''), '| bin:', JSON.stringify(p.bin));
}"
```

Expected: `error-code-generator` and `swirl-mcp` — matching the old object keys exactly.

If anything **other** than the four changes above appears, revert that file and investigate.

- [ ] **Step 11: Update the README**

Replace `README.md:103-109` — the block telling contributors to install Yarn 1, including the fenced `npm install --global yarn@1` snippet:

```markdown
You need to have [Node.js](https://nodejs.org/en) installed on your machine (at
least v18.12). We recommend using [nvm](https://github.com/nvm-sh/nvm) for that.

Yarn is pinned to 4.18.0 and committed to the repo, so you do not need to
install it: running `yarn` in this repo uses `.yarn/releases/yarn-4.18.0.cjs`
automatically. If you have no `yarn` on your `PATH` at all, enable Corepack
once with `corepack enable`.
```

Leave the command table and the rest of the section as-is — every command in it still works.

- [ ] **Step 12: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add .yarnrc.yml .yarn/releases/yarn-4.18.0.cjs yarn.lock package.json \
  packages/error-code-generator/package.json packages/swirl-mcp/package.json \
  packages/swirl-components-react/package.json README.md
git commit -m "build: migrate to Yarn 4.18.0

Pins Yarn via yarnPath + a committed release binary so the Yarn 1 already
present on CI runners delegates to it. Keeps the node-modules linker and
the existing dependency resolutions; the lockfile is converted, not
re-resolved.

npmMinimalAgeGate stays 0, which is what Yarn's own migration writes to
preserve Yarn 1 behaviour — the release-age gate lands in a follow-up PR
(COR-2286).

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Fix swirl-docs for Yarn's shell and lifecycle changes

Two independent regressions, both in swirl-docs, both from Yarn 4 (B3 and B4). Fixed together because they are one workspace and one test.

**Files:**
- Modify: `apps/swirl-docs/package.json:22` (the `prebuild` script)
- Modify: `turbo.json` (add a `swirl-docs#build` task)

**Interfaces:**
- Consumes: a working Yarn 4 install from Task 1.
- Produces: `turbo run prebuild` succeeds, and `turbo run build` still generates swirl-docs' API docs data.

- [ ] **Step 1: Reproduce the shell failure**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn turbo run prebuild
```

Expected: FAIL with

```
swirl-docs:prebuild: No matches found: "specs/**"
```

Yarn 4 runs scripts through its own portable shell, which treats a glob matching nothing as an error. `sh` passes it through literally, so `rm -rf` never minded.

- [ ] **Step 2: Fix the glob**

In `apps/swirl-docs/package.json`, change the `prebuild` script. Only the last `rm -rf` changes — `specs/**` becomes `specs`:

```json
"prebuild": "rm -rf components.json && rm -rf problem.yml && rm -rf shared.yml && rm -rf specs && tsx src/scripts/prebuild.ts"
```

- [ ] **Step 3: Verify prebuild gets past the shell**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn turbo run prebuild
```

Expected: **no** `No matches found`. Without the `NEXT_PUBLIC_ALGOLIA_APP_ID` / `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` / `NEXT_PUBLIC_DEPLOYMENT_STAGE` secrets it will then fail with a `ZodError` listing those variables as `Required` — that is the correct, expected stopping point locally and proves the shell problem is gone. CI supplies them (`lint-test.yml:28-35`).

If you have the secrets, export them and confirm it runs to completion.

- [ ] **Step 4: Reproduce the lifecycle regression**

Yarn 4 does not run arbitrary `pre`/`post` scripts (B4), so `prebuild` and `postbuild` no longer fire when turbo invokes swirl-docs' `build`. Confirm the general behaviour:

```bash
cd /Users/paulobernardes/getflip/swirl
node -e "console.log(JSON.stringify(require('./apps/swirl-docs/package.json').scripts,null,2))"
```

Note that `prebuild`, `build` and `postbuild` all exist. Under Yarn 1, `yarn build` ran all three; under Yarn 4 it runs only `build`.

- [ ] **Step 5: Re-attach prebuild through turbo**

`turbo.json` already uses this pattern for `build:swirl-docs`. Add a matching workspace-scoped override so the generic `build` task carries the same dependency. Insert after the `"stencil:build"` task block:

```json
    "swirl-docs#build": {
      "outputs": [".next/**"],
      "dependsOn": ["prebuild", "^build"]
    }
```

Note: this covers `turbo run build`, which is how swirl-docs is built at the repo root and in CI. It does **not** cover running `yarn build` directly inside `apps/swirl-docs` — that no longer runs `prebuild` on its own, and contributors must run `yarn prebuild` first. `apps/swirl-docs/Dockerfile` is unaffected: its build context is `apps/swirl-docs`, so it never sees the root `.yarnrc.yml` and keeps running Alpine's Yarn 1.

- [ ] **Step 6: Verify the turbo graph**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn turbo run build --filter=swirl-docs --dry=json \
  | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{
      const j=JSON.parse(s);
      for (const t of j.tasks) console.log(t.taskId, '<- deps:', JSON.stringify(t.dependencies));
    })"
```

Expected: the `swirl-docs#build` entry lists `swirl-docs#prebuild` among its dependencies.

- [ ] **Step 7: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add apps/swirl-docs/package.json turbo.json
git commit -m "build: fix swirl-docs prebuild under Yarn 4

Yarn 4 runs scripts through its own portable shell, where a glob that
matches nothing is fatal, so 'rm -rf specs/**' failed. It also does not
run arbitrary pre/post scripts, so prebuild no longer fired implicitly
from build; re-attach it through turbo instead.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Remove the dead patch-package wiring

`patch-package` runs from a root `prebuild` script, which Yarn 4 no longer invokes (B4). It is also already a no-op: `patches/` held `@stencil+core+4.18.1.patch` and `pdfjs-dist+2.16.105.patch` until commit `8e54adba` ("Update StencilJS to 4.35.0 (#1063)") deleted both, leaving the dependency and the hook behind. So this removes dead code rather than replacing behaviour. A reviewer could reasonably reject this task while accepting every other one, which is why it stands alone.

**Files:**
- Modify: `package.json` (drop `prebuild` script, drop two devDependencies)
- Modify: `yarn.lock`

**Interfaces:**
- Consumes: a working Yarn 4 install from Task 1.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Confirm it is genuinely dead**

```bash
cd /Users/paulobernardes/getflip/swirl
ls patches 2>&1
find . -maxdepth 3 -name patches -not -path "*/node_modules/*"
grep -rn "patch-package\|postinstall-postinstall" --include=package.json . | grep -v node_modules
```

Expected: no `patches` directory anywhere, and `patch-package` / `postinstall-postinstall` referenced only in the root `package.json`. If a `patches/` directory does exist, **stop** — skip this task entirely and report it, because the patches would silently stop applying.

- [ ] **Step 2: Remove the script and the dependencies**

In `package.json`, delete the `"prebuild": "patch-package"` line from `scripts`, and delete `"patch-package": "6.4.7"` and `"postinstall-postinstall": "2.1.0"` from `devDependencies`.

- [ ] **Step 3: Update the lockfile**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn install
```

Expected: completes; `patch-package` and `postinstall-postinstall` drop out of `yarn.lock`.

- [ ] **Step 4: Verify the build is unaffected**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn build --filter=@getflip/swirl-tokens
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add package.json yarn.lock
git commit -m "build: drop dead patch-package wiring

It ran from a root prebuild script, which Yarn 4 no longer invokes, and
there is nothing left for it to apply: patches/ held @stencil/core and
pdfjs-dist patches until 8e54adba deleted both, but the dependency and
the hook stayed behind.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Update the workflows

`yarn install --ignore-scripts` is a hard error in Yarn 4 (B2), and it appears in five places. Yarn 4's equivalent is `--mode=skip-build`, which is what keeps CI's behaviour identical: `enableScripts: true` from Task 1 means local installs still run dependency install scripts, and this flag means CI still does not. One workflow also pins Node 16, below Yarn 4's floor (B6).

**Files:**
- Modify: `.github/workflows/lint-test.yml:47-48`
- Modify: `.github/workflows/publish.yml:32` and `:76`
- Modify: `.github/workflows/build-deploy.yml:31`
- Modify: `.github/workflows/sonarqube.yml:18`
- Modify: `.github/workflows/figma-to-style-dictionary.yml:23`

**Interfaces:**
- Consumes: `.yarn/releases/yarn-4.18.0.cjs` and `yarnPath` from Task 1 — this is what makes `build-deploy.yml` and `sonarqube.yml` work without a `setup-node` step.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Confirm the flag actually breaks**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn install --ignore-scripts
```

Expected: FAIL with

```
Unknown Syntax Error: Unsupported option name ("--ignore-scripts").
```

Then confirm the replacement works, including under the immutable install CI gets:

```bash
cd /Users/paulobernardes/getflip/swirl && CI=true yarn install --mode=skip-build
```

Expected: `Done with warnings`, a Link step that runs no builds, and no `YN0028`.

- [ ] **Step 2: Translate the flag in all five places**

In each file, change `yarn install --ignore-scripts` to `yarn install --mode=skip-build`:

- `.github/workflows/lint-test.yml:48`
- `.github/workflows/publish.yml:32`
- `.github/workflows/publish.yml:76`
- `.github/workflows/build-deploy.yml:31`
- `.github/workflows/sonarqube.yml:18` — this one is `yarn install --ignore-scripts && yarn test:coverage`; it becomes `yarn install --mode=skip-build && yarn test:coverage`.

- [ ] **Step 3: Fix the stale setup-node cache key**

`.github/workflows/lint-test.yml:47` sets `cache: "npm"` on a repo that has never used npm. Change it to:

```yaml
          cache: "yarn"
```

- [ ] **Step 4: Raise Node 16 above Yarn 4's floor**

`.github/workflows/figma-to-style-dictionary.yml:23` — change `node-version: 16` to:

```yaml
          node-version: 20
```

Yarn 4.18.0 requires Node >= 18.12, and this workflow runs `cd packages/swirl-tokens && yarn && yarn build`, which now delegates to Yarn 4.

- [ ] **Step 5: Verify none are left**

```bash
cd /Users/paulobernardes/getflip/swirl
grep -rn "ignore-scripts" .github/workflows/ ; echo "grep exit=$? (1 = none left, good)"
grep -rn "yarn install" .github/workflows/
grep -rn "node-version" .github/workflows/
```

Expected: no `ignore-scripts` hits; all five `yarn install` lines carry `--mode=skip-build`; every `node-version` is 20 or 22.

- [ ] **Step 6: Verify the workflows are still valid YAML**

```bash
cd /Users/paulobernardes/getflip/swirl
for f in .github/workflows/*.yml; do
  python3 -c "import yaml; yaml.safe_load(open('$f')); print('ok   $f')" || echo "FAIL $f"
done
```

Expected: `ok` for all six files.

- [ ] **Step 7: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add .github/workflows/
git commit -m "ci: adapt workflows to Yarn 4

--ignore-scripts is not a valid yarn install option in Yarn 4; the
equivalent is --mode=skip-build, so CI keeps skipping dependency install
scripts exactly as before while local installs still run them. Also
raises the Figma tokens workflow off Node 16, below Yarn 4's floor of
18.12, and corrects a setup-node cache key that said npm.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Keep the release flow installable

The one genuinely dangerous change (B1). Yarn 4's lockfile records the exact internal versions dependents request, and `changeset version` rewrites those on every release. `enableImmutableInstalls` defaults to `true` when `CI=true`, and `changesets/action@v1` never refreshes the lockfile — it only runs `git add .` and commits. Without this task, every "Version Packages" PR merges a stale lockfile and fails CI.

**Files:**
- Modify: `package.json` (add a `version:ci` script)
- Modify: `.github/workflows/publish.yml:34-38` (pass `version:` to the action) and `:83-86` (snapshot job)

**Interfaces:**
- Consumes: the Yarn 4 lockfile from Task 1.
- Produces: a `version:ci` script that `changesets/action` invokes in place of the default `changeset version`.

- [ ] **Step 1: Reproduce the failure**

Simulate what `changeset version` does — bump a workspace version and the pin its dependent carries:

```bash
cd /Users/paulobernardes/getflip/swirl
cp yarn.lock /tmp/yarn.lock.bak
cp packages/swirl-icons/package.json /tmp/icons.pkg.bak
cp packages/swirl-components/package.json /tmp/components.pkg.bak
node -e "
const fs=require('fs');
const a='packages/swirl-icons/package.json', b='packages/swirl-components/package.json';
const pa=JSON.parse(fs.readFileSync(a)); pa.version='9.99.9'; fs.writeFileSync(a,JSON.stringify(pa,null,2)+'\n');
const pb=JSON.parse(fs.readFileSync(b)); pb.dependencies['@getflip/swirl-icons']='9.99.9'; fs.writeFileSync(b,JSON.stringify(pb,null,2)+'\n');
"
CI=true yarn install
```

Expected: FAIL with

```
YN0028: The lockfile would have been modified by this install, which is
explicitly forbidden.
```

- [ ] **Step 2: Verify the fix works before wiring it up**

```bash
cd /Users/paulobernardes/getflip/swirl
yarn install --mode=update-lockfile
CI=true yarn install
```

Expected: the first command rewrites `yarn.lock` without linking; the second then passes with **no** `YN0028`.

- [ ] **Step 3: Restore the simulated bump**

```bash
cd /Users/paulobernardes/getflip/swirl
cp /tmp/icons.pkg.bak packages/swirl-icons/package.json
cp /tmp/components.pkg.bak packages/swirl-components/package.json
cp /tmp/yarn.lock.bak yarn.lock
git status --short
```

Expected: no changes to `yarn.lock` or either `package.json`.

- [ ] **Step 4: Add the `version:ci` script**

In `package.json`, add to `scripts`, next to `release`:

```json
    "version:ci": "changeset version && yarn install --mode=update-lockfile",
```

- [ ] **Step 5: Point the action at it**

In `.github/workflows/publish.yml`, the `changesets/action@v1` step currently passes only `publish`. Add `version`:

```yaml
      - name: Publish to npm
        id: changesets
        uses: changesets/action@v1
        with:
          publish: yarn release
          version: yarn version:ci
```

`changesets/action` stages with `git add .`, so the refreshed `yarn.lock` is committed into the Version Packages PR along with the version bumps.

- [ ] **Step 6: Fix the snapshot job too**

The same staleness applies to the `snapshot` job, which runs `npx changeset version --snapshot beta` at `.github/workflows/publish.yml:83-86`. It publishes directly without a lockfile install afterwards, so it does not fail today — but it builds *before* versioning, and a future reorder would bite. Add the refresh immediately after the version step:

```yaml
      - name: Create snapshot versions
        run: npx changeset version --snapshot beta
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Refresh lockfile after snapshot versioning
        run: yarn install --mode=update-lockfile
```

- [ ] **Step 7: Verify the script resolves**

```bash
cd /Users/paulobernardes/getflip/swirl && yarn run --help >/dev/null && node -e "
const s=require('./package.json').scripts;
console.log('version:ci =', s['version:ci']);
console.log('release    =', s.release);
"
```

Expected: `version:ci = changeset version && yarn install --mode=update-lockfile`.

Do **not** run `yarn version:ci` itself — it would consume the real changesets and bump every package.

- [ ] **Step 8: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add package.json .github/workflows/publish.yml
git commit -m "ci: refresh the lockfile after changeset version

Yarn 4's lockfile keys workspace entries by the exact internal version
dependents request, and CI installs are immutable by default, so a
Version Packages PR would otherwise land a stale lockfile and fail every
subsequent job. Yarn 1's lockfile had no workspace entries, so this could
not happen before.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Full verification and changeset

**Files:**
- Create: `.changeset/<generated-name>.md`

**Interfaces:**
- Consumes: everything from Tasks 1–5.
- Produces: the PR.

- [ ] **Step 1: Clean install from scratch**

Proves the committed state works for someone who has never built this repo, on both paths — the developer path and the CI path.

```bash
cd /Users/paulobernardes/getflip/swirl
rm -rf node_modules packages/*/node_modules apps/*/node_modules
yarn install                                  # developer path: scripts run
CI=true yarn install --mode=skip-build        # CI path: scripts skipped, immutable
```

Expected: the first takes roughly 3 minutes and reports **15** `YN0007` builds — 15 rather than 16 because Task 3 removed `postinstall-postinstall`. The second is fast and reports none. Neither emits `YN0028`. The `YN0002`/`YN0060` peer warnings are expected on both.

The rest of this task runs against the developer-path tree.

- [ ] **Step 2: Build every package**

```bash
cd /Users/paulobernardes/getflip/swirl
yarn build --filter=@getflip/swirl-tokens && \
yarn build --filter=@getflip/swirl-icons && \
yarn workspace @getflip/swirl-components run stencil:build && \
yarn workspace @getflip/swirl-components-react run build && \
yarn workspace @getflip/swirl-components-angular run build && \
yarn workspace @getflip/bridge run build && \
yarn workspace @getflip/swirl-mcp run build
echo "BUILD_EXIT=$?"
```

Expected: `BUILD_EXIT=0`.

- [ ] **Step 3: Build Storybook**

Run this separately — it is the slowest step and was never verified during investigation, because the probe worktree's path was long enough to trip a macOS filename limit inside Storybook's virtual module IDs.

```bash
cd /Users/paulobernardes/getflip/swirl && yarn workspace @getflip/swirl-components run storybook:build
echo "STORYBOOK_EXIT=$?"
```

Expected: `STORYBOOK_EXIT=0`. If it fails with `ENAMETOOLONG`, the repo is checked out at too deep a path and that is not a Yarn problem — note it and move on. Any other failure is a real finding: report it rather than working around it.

- [ ] **Step 4: Lint and test**

```bash
cd /Users/paulobernardes/getflip/swirl
yarn lint; echo "LINT_EXIT=$?"
yarn workspace @getflip/swirl-components run test; echo "TEST_EXIT=$?"
```

Expected: `LINT_EXIT=0`, and `TEST_EXIT=0` with `Test Suites: 106 passed, 106 total` / `Tests: 587 passed, 587 total` / `Snapshots: 14 passed, 14 total`.

That 587 is the measured Yarn 1 baseline for this branch's merge-base (`c29231e7`), captured before the migration started — not a number carried over from the spec, which was written against an older commit where the suite had 551 tests. The counts must match exactly; if fewer tests ran, something is not being discovered.

- [ ] **Step 5: Discard rebuild noise and confirm the working tree**

```bash
cd /Users/paulobernardes/getflip/swirl && git status --short
```

Expected — and this is **not** a clean tree. The icons and tokens builds
regenerate files that are committed to the repo, so after Step 2 these will
show as modified even though nothing meaningful changed:

```
 M packages/swirl-icons/dart/lib/fonts/flip-legacy-icons.ttf
 M packages/swirl-icons/dart/lib/fonts/swirl-icons.ttf
 M packages/swirl-tokens/dart/lib/styles.dark.dart
 M packages/swirl-tokens/dart/lib/styles.light.dart
```

These are byte-level rebuild noise, not migration output. **Discard them** —
they belong to whoever next changes an icon or a token, not to this PR:

```bash
cd /Users/paulobernardes/getflip/swirl
git checkout -- packages/swirl-icons/dart packages/swirl-tokens/dart
git status --short
```

Expected after the checkout: clean. If `yarn.lock` or any `package.json` is
dirty at this point, a build step mutated it — investigate before opening the
PR.

- [ ] **Step 6: Add a changeset**

This change touches build tooling, not published output, so no package needs a version bump. Add an *empty* changeset:

```bash
cd /Users/paulobernardes/getflip/swirl && yarn changeset --empty
```

Expected: `Empty Changeset added and committed` and a new `.changeset/<random-name>.md` containing just an empty frontmatter block:

```markdown
---
---
```

If the interactive prompt gets in the way, write the file by hand with exactly that content — an empty frontmatter block is what `--empty` produces.

- [ ] **Step 7: Commit and push**

```bash
cd /Users/paulobernardes/getflip/swirl
git add .changeset/
git commit -m "chore: add changeset for the Yarn 4 migration

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
git push -u origin HEAD
```

- [ ] **Step 8: Open the PR**

Per the repo's memory note, Swirl uses GitHub PRs, not the GitLab MR automation.

```bash
cd /Users/paulobernardes/getflip/swirl
gh pr create --title "COR-2286 Migrate to Yarn 4.18.0" --body "$(cat <<'EOF'
Prerequisite for COR-2286: the release-age gate (`npmMinimalAgeGate`) needs
Yarn >= 4.10, and Yarn Classic has no equivalent.

This PR is the package-manager change only. **The gate is not enabled here** —
`npmMinimalAgeGate` is pinned to `0`, which is what Yarn's own migration writes
to preserve Yarn 1 behaviour. Turning it on to `3d` with
`npmPreapprovedPackages: ["@getflip/*"]` is a one-line follow-up PR.

## What changed

- Yarn 4.18.0, pinned via `yarnPath` and a committed `.yarn/releases` binary, so
  the Yarn 1 already on CI runners delegates to it. No `corepack enable` needed —
  two workflows have no `setup-node` step at all.
- `yarn.lock` converted to Yarn 4 format. No dependency versions changed.
- `--ignore-scripts` → `--mode=skip-build` in all five workflows. Local
  installs still run dependency install scripts and CI still does not, exactly
  as before.
- `apps/swirl-docs` `prebuild`: `rm -rf specs/**` → `rm -rf specs`. Yarn 4 runs
  scripts through its own shell, where a glob matching nothing is fatal.
- `prebuild` re-attached to swirl-docs' `build` through turbo, since Yarn 4 does
  not run arbitrary pre/post scripts.
- `changeset version` now refreshes the lockfile. Yarn 4's lockfile records the
  exact internal versions dependents request, and CI installs are immutable by
  default, so the Version Packages PR would otherwise land broken.
- Dropped dead `patch-package` wiring. `patches/` was deleted in 8e54adba; the
  dependency and its `prebuild` hook were left behind.
- Figma tokens workflow off Node 16 — Yarn 4 needs >= 18.12.

## Verified

Clean install, all package builds, Storybook, `yarn lint`, and the Stencil spec
suite (106 suites / 587 tests, matching the pre-migration baseline). OIDC
trusted publishing is unaffected —
`@changesets/cli` special-cases only pnpm and uses `npm publish` for everything
else.

Full investigation: `docs/superpowers/specs/2026-09-17-yarn-4-migration.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

### Task 7: Fix the Storybook build (discovered during Task 6's verification)

Task 6 Step 3 ("Build Storybook") was where this was actually found: `yarn workspace @getflip/swirl-components run storybook:build` failed, and it was a real finding rather than the `ENAMETOOLONG` path-length artifact the plan anticipated. This task records what shipped to fix it — it is a record of what happened, not instructions to re-run.

**Files:**
- Modify: `.yarnrc.yml` (`packageExtensions` block)

**Interfaces:**
- Consumes: the Yarn 4 install from Task 1, `@storybook/builder-vite@10.2.11` and the two vite majors already pinned in the workspace (`packages/swirl-components` devDependency `vite@5.4.0`; `packages/swirl-components-react`'s transitive `vite@3.2.10`).
- Produces: `yarn workspace @getflip/swirl-components run storybook:build` succeeds; no other package's resolution changes.

- [ ] **Step 1: Diagnose past the misleading symptom**

The build failed inside vite 3's bundled esbuild:

```
Big integer literals are not available in the configured target environment
```

The literal in question is a `0n` in bundled `chai@4.4.0`, which made this look like a `chai` regression. It is not — `chai` resolves to identical versions in both the Yarn 1 and Yarn 4 lockfiles. The real cause is upstream of `chai`: `@storybook/builder-vite@10.2.11` declares `vite` only as a peerDependency (`^5.0.0 || ^6.0.0 || ^7.0.0`), never as a real `dependencies` entry. Under Yarn 1's hoisting, `builder-vite` happened to land next to `swirl-components`' own `vite@5.4.0`. Yarn 4's node-modules linker hoists differently: `vite@3.2.10` (pulled in via `swirl-components-react`) wins the single root slot, which violates builder-vite's peer range, so it links against vite 3, not 5.

Yarn already detects this — `YN0086 "peer dependencies incorrectly met"` — but only warns; it does not restructure the tree on its own.

- [ ] **Step 2: Reject the naive fix**

An earlier attempt used `installConfig.hoistingLimits: "workspaces"` on `packages/swirl-components/package.json`, to force a `vite@5.4.0` next to `builder-vite` by unhoisting `swirl-components`' whole dependency tree. It fixed Storybook, but it also unhoisted `pdfjs-dist`, breaking `stencil:build` — `packages/swirl-components/stencil.config.ts`'s `copy` output target reads it from the hardcoded path `../../../node_modules/pdfjs-dist`. Rejected: a fix that breaks a different, passing build is not a fix.

- [ ] **Step 3: Apply the targeted fix**

Add a `packageExtensions` entry in `.yarnrc.yml` giving `@storybook/builder-vite` a real `dependencies.vite`, so Yarn resolves and links an actual vite 5.4.0 next to it, without touching how anything else in the tree is hoisted:

```yaml
# @storybook/builder-vite@10.2.11 only declares vite as a peerDependency
# (no `dependencies.vite`), so Yarn 4's node-modules linker is free to hoist
# it next to whichever vite happens to win the root slot. This repo pins two
# vite majors across workspaces (swirl-components: 5.4.0,
# swirl-components-react: 3.2.10); when 3.2.10 wins the root, it violates
# builder-vite's peer range (^5.0.0 || ^6.0.0 || ^7.0.0), and Storybook's
# preview build fails inside vite 3's bundled esbuild. This extension patches
# builder-vite's manifest so Yarn resolves/hoists a real vite 5.4.0 for it,
# without touching the physical layout of any other dependency (e.g.
# pdfjs-dist stays hoisted at the root, where swirl-components/stencil.config.ts
# expects it).
packageExtensions:
  "@storybook/builder-vite@*":
    dependencies:
      vite: "5.4.0"
```

No `yarn.lock` changes result: Yarn resolves the extension against the `vite@5.4.0` resolution that already exists for `swirl-components`' own devDependency, so no new lockfile entry is needed. It does create a second physical copy of vite at `node_modules/@storybook/builder-vite/node_modules/vite`, which is expected — see the comment block in `.yarnrc.yml`.

- [ ] **Step 4: Verify**

```bash
cd /Users/paulobernardes/getflip/swirl
yarn workspace @getflip/swirl-components run storybook:build
yarn workspace @getflip/swirl-components run stencil:build
yarn workspace @getflip/swirl-components run test
yarn lint
CI=true yarn install
```

Expected: Storybook build succeeds; `stencil:build` succeeds and its `pdfjs-dist` copy step actually copies files (checked by listing, not just exit code — an unhoisting regression here would fail silently on exit code alone); tests stay at 106 suites / 587 tests / 14 snapshots; lint passes; `CI=true yarn install` reports no `YN0028`. Also confirm `swirl-components-react` still resolves `vite@3.2.10`, unaffected by the extension.

- [ ] **Step 5: Commit**

```bash
cd /Users/paulobernardes/getflip/swirl
git add .yarnrc.yml
git commit -m "build: patch @storybook/builder-vite's manifest to fix Storybook under Yarn 4

@storybook/builder-vite@10.2.11 declares vite only as a peerDependency
(^5.0.0 || ^6.0.0 || ^7.0.0), never as a real dependency. This repo pins two
vite majors across workspaces (swirl-components: 5.4.0,
swirl-components-react: 3.2.10). Under Yarn 1's hoisting, builder-vite
happened to land next to swirl-components' own vite 5.4.0. Yarn 4's
node-modules linker hoists differently: vite 3.2.10 wins the single root
slot, which violates builder-vite's peer range, so Storybook's preview
build fails inside vite 3's bundled esbuild (\"Big integer literals are
not available in the configured target environment\").

Yarn already detects the mismatch (YN0086 \"peer dependencies incorrectly
met\") but only warns; it won't restructure the tree on its own.

Fix via packageExtensions in .yarnrc.yml: add a real \`dependencies.vite\`
entry to builder-vite's manifest so Yarn resolves/links an actual vite
5.4.0 next to it. This is the targeted fix for the one package with the
broken manifest, and it leaves the rest of the tree's physical layout
untouched — pdfjs-dist and everything else stays hoisted at the root
exactly as before, so swirl-components/stencil.config.ts's hardcoded
../../../node_modules/pdfjs-dist paths keep resolving.

An earlier attempt used installConfig.hoistingLimits: \"workspaces\" on
swirl-components' package.json to force vite 5.4.0 next to builder-vite.
That fixed Storybook but unhoisted swirl-components' entire dependency
tree, including pdfjs-dist, breaking those hardcoded stencil.config.ts
paths and failing stencil:build. Rejected in favor of this narrower fix.

No yarn.lock changes: Yarn resolves the extension against the vite@5.4.0
resolution that already exists for swirl-components' own devDependency,
so no new lockfile entry is needed.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

This landed as commit `0dffda87`, after Task 6's changeset commit — Storybook's verification is what surfaced it, one task late relative to where the spec originally expected it (B7).

---

## Risks and stop conditions

**Stop and report rather than working around:**

- Task 1 Step 4 prints `1.22.22` — `yarnPath` is not taking effect, and every CI assumption in this plan rests on it.
- Task 1 Step 8 reports any package at a different version — the lockfile re-resolved, which this PR must not do.
- Task 3 Step 1 finds a `patches/` directory — skip Task 3 entirely; the patches would silently stop applying.
- Task 6 Step 4 runs fewer than 587 tests — test discovery changed.

**Known-acceptable warnings, do not chase:**

- `YN0002` / `YN0060` peer-dependency warnings. Pre-existing; Yarn 1 never reported them.
- `YN0007` "must be built because it never has been before" on a local `yarn install`. Expected — that is `enableScripts: true` doing its job, matching Yarn 1.
- `Browserslist: caniuse-lite is outdated`. Pre-existing.
- `unable to find package.json for imask`, during the Storybook build. Pre-existing.

**Rollback:** every task is one commit, and the migration is confined to `.yarnrc.yml`, `.yarn/`, `yarn.lock`, `package.json` files, `turbo.json` and `.github/workflows/`. `git revert` of Task 1 restores Yarn 1 behaviour, since `packageManager` and `yarnPath` both go back.

## Reference implementation

A throwaway worktree with Tasks 1 and 2 already applied is at:

```
/private/tmp/claude-501/-Users-paulobernardes-getflip-swirl/0a3c3a7f-9195-4fbc-8889-93be50f75b4f/scratchpad/yarn4-probe
```

It carries the exact `.yarnrc.yml` this plan specifies, the converted
`yarn.lock`, the four Yarn-written `package.json` rewrites, and the swirl-docs
`prebuild` fix — useful to diff against if a step produces something
unexpected. It does **not** have the workflow changes (Task 4), the
`patch-package` removal (Task 3) or the release-flow fix (Task 5), and its
`node_modules` is 1.6 GB. It is a scratch artifact, not a source of truth; the
spec is.

Remove it when done:

```bash
git worktree remove --force /private/tmp/claude-501/-Users-paulobernardes-getflip-swirl/0a3c3a7f-9195-4fbc-8889-93be50f75b4f/scratchpad/yarn4-probe
```
