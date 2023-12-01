This is a [Next.js](https://nextjs.org/) project.

## Getting Started

Before starting the dev environment for this application, run the
`turbo run build` command. This will ensure that the dependencies within the
monorepo are up-to-date and will help keep the `dev`-command running smoothly.
It's recommended to run `turbo run build` after publications of packages from
the monorepo.

The following commands need to run on root level of the monorepo.

```bash
yarn build
OR
npx turbo run build --filter=swirl-docs # filter to only run the build command for the swirl-docs app
```

When all the dependencies are up-to-date on your machine you can start the dev
environment:

```bash
yarn workspace swirl-docs dev
OR
npx turbo run dev --filter=swirl-docs # filter to only run the dev command for the swirl-docs app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

### React Pages

Under `src/pages/*` the folder structure sets the navigational-structure of the
application. For futher information check the
[NextJS Documentation](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts).

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

## Generated API Documentation based on the API Spec

To generate the API documentation, we use several Libraries within a Builder
Class called `OasBuilder`. This Builder has two versions. One for the Build &
Client called `OasBuilder` and one for the setup of the API Spec called
`OasBuilderSetup`. The `OasBuilderSetup` is only used to generate the navigation
Items based on the API Spec Files. You can find these under
`apps/swirl-docs/specs`. This "duplication" was introduced, because the lib we
are using has some typing problems under certain environments. To avoid these
problems, we decided to split the Builder into two versions.

### Dive deeper into the libs we use to generate the API Documentation

- [OAS to HAR](https://github.com/readmeio/oas-to-har#readme) - Utility to
  transform an OAS operation into a HAR representation
- [oas library from readmeio](https://github.com/readmeio/oas#readme) -
  Comprehensive tooling for working with OpenAPI definitions
- [OAS normalize](https://github.com/readmeio/oas-normalize#readme) - Tooling
  for converting, valiating, and parsing OpenAPI, Swagger, and Postman API
  definitions

## Learn More about the Stack

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind Core Concepts](https://tailwindcss.com/docs/utility-first)
- [MDX Docs](https://mdxjs.com/docs/)

## Environment Variables

To see which ENV variables are used in this project, please check the
[.env.example](.env.example) file.
