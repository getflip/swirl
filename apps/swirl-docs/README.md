This is a [Next.js](https://nextjs.org/) project.

## Getting Started

Before starting the dev environment for this application, run the `yarn build`
command. This will ensure that the dependencies within the monorepo are
up-to-date and will help keep the `dev`-command running smoothly. It's
recommended to run `yarn build` after publications of packages from the
monorepo.

The following commands need to run on root level of the monorepo.

```bash
yarn build
OR
npx turbo run build
```

When all the dependencies are up-to-date on your machine you can start the dev
environment:

```bash
yarn workspace swirl-docs dev
OR
npx turbo run dev --filter="swirl-docs"
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

### React Pages

Under `src/pages/*` the folder structure sets the navigational-structure of the
application.

### API Routes

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api](http://localhost:3000/api/hello).

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

## Libs

This full-stack application has a data creation flow that is based on static
files such as mdx and json. Each feature of the application has a dedicated
library that manages its specific data types and business logic. This approach
enables code reuse across the application, for example the same functions can be
used to create views and push data into the Algolia index.

## Learn More about the Stack

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind Core Concepts](https://tailwindcss.com/docs/utility-first)
- [MDX Docs](https://mdxjs.com/docs/)
