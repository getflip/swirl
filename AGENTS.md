# AGENTS.md

This file provides guidance to AI agents ([AGENTS.md](https://AGENTS.md)) when
working in the Swirl repository.

Swirl is Flip's design system: Stencil web components with generated React and
Angular wrappers, design tokens, icons, and the Swirl MCP server
(`packages/swirl-ai` builds its data, `packages/swirl-mcp` serves it). Flip apps
consume the published npm packages.

Bugs handed over from a Flip app are fixed here. Reproduce the consuming call
site in a spec before changing the component.

The Flip Swirl MCP serves published versions. In this repository, read the
component source instead.

**Working a ticket autonomously:** when running unattended (e.g. a Cursor Cloud
agent started from Linear), follow
[.claude/skills/autonomous-ticket-workflow/SKILL.md](.claude/skills/autonomous-ticket-workflow/SKILL.md).

# Commands

Yarn 1 workspaces with Turborepo. Do not use npm or pnpm at the root. Run these
from the repository root.

```bash
yarn

# Required before any Stencil build or test on a fresh checkout
yarn build --filter=@getflip/swirl-tokens

# Stencil watch + Storybook on http://localhost:6006
yarn dev

# Format the files you changed — `yarn format` rewrites the whole repository
yarn prettier --write <files>
```

CI does not check formatting, but the review checklist requires it.

# Changesets

Every change to a published package needs exactly one changeset. The CLI is
interactive, so write `.changeset/<kebab-case-name>.md` by hand:

```md
---
"@getflip/swirl-components": minor
"@getflip/swirl-components-angular": minor
"@getflip/swirl-components-react": minor
---

Add optional heading prop to swirl-banner
```

- Component changes list these three packages; they are released together.
- `minor` for new optional props, events, values or icons, `patch` for fixes.
- Other packages use their own name, e.g. `"@getflip/swirl-icons"`,
  `"@getflip/swirl-mcp"`, `"swirl-docs"`.

Avoid breaking changes. What counts as breaking is defined in
[Update a Component](packages/swirl-components/src/docs/02-contributions/03-update-a-component.stories.mdx).
If a ticket needs one, stop and ask.

# Generated Dart files

Building icons or tokens (also part of `yarn dev`) rewrites the tracked Dart
output in `packages/swirl-icons/dart/lib/` and
`packages/swirl-tokens/dart/lib/`. Revert those files unless the change is about
icons or tokens.

# Packages

- Before adding or changing icons, read
  [packages/swirl-icons/README.md](packages/swirl-icons/README.md).
  `yarn generate icons` skips the prompt.
- Tokens are exported from Figma into `packages/swirl-tokens/figma-tokens.json`.
  Never edit `packages/swirl-tokens/tokens/` by hand.
- `packages/swirl-mcp` has its own `package-lock.json` for its Docker image.
  Dependency changes there update both it and the root `yarn.lock`.

# Pull requests

- Title: a short imperative sentence, e.g. "Add heading prop to banner".
- Fill in [the PR template](.github/pull_request_template.md).
- Reviewers use the checklist in
  [Merge & Publish](packages/swirl-components/src/docs/02-contributions/05-merge-and-publish.stories.mdx).

# Agent files

`AGENTS.md` holds the content; the `CLAUDE.md` beside it contains only
`@AGENTS.md`. One pair per package root. Task workflows are skills in
`.claude/skills/<name>/SKILL.md`, which Cursor reads too. Point to existing docs
and code instead of restating them.
