# 1. Nextjs

## 1.1. Basic Features

### 1.1.1. Pages

- **page** is a React Component.

- Two forms of Pre-rendering
  - **Static Generation**: generated at **build time**.
  - **Server-side Rendering**: generated on **each request**.

### 1.1.2. Data Fetching

Three unique functions

- `getStaticProps`
- `getStaticPaths`
- `getServerSideProps`

#### 1.1.2.1. `getStaticProps`

```javascript
export type GetStaticProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (context: GetStaticPropsContext<Q>) => Promise<GetStaticPropsResult<P>>

export type GetStaticPropsContext<Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  params?: Q
  preview?: boolean
  previewData?: any
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export type GetStaticPropsResult<P> =
  | { props: P; revalidate?: number | boolean }
  | { redirect: Redirect; revalidate?: number | boolean }
  | { notFound: true }
```

> **Note**: You can import modules in top-level scope for use in `getStaticProps`.
> Imports used in `getStaticProps` will [not be bundled for the client-side](#write-server-side-code-directly).

> **Note**: You should not use [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to call an API route in `getStaticProps`.
> Fetching from an external API is fine!

#### 1.1.2.2. `getStaticPaths`

The `path` and `fallback` key are required.

```javascript
export type GetStaticPaths<P extends ParsedUrlQuery = ParsedUrlQuery> = (
  context: GetStaticPathsContext
) => Promise<GetStaticPathsResult<P>>


export type GetStaticPathsContext = {
  locales?: string[]
  defaultLocale?: string
}

export type GetStaticPathsResult<P extends ParsedUrlQuery = ParsedUrlQuery> = {
  paths: Array<string | { params: P; locale?: string }>
  fallback: boolean | 'blocking'
}
```

#### 1.1.2.3. `getServerSideProps`

```javascript
export type GetServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
  res: ServerResponse
  params?: Q
  query: ParsedUrlQuery
  preview?: boolean
  previewData?: any
  resolvedUrl: string
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export type GetServerSidePropsResult<P> =
  | { props: P }
  | { redirect: Redirect }
  | { notFound: true }

export type GetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>
```

### 1.1.3. Static File Serving

> **Note**: Be sure to not have a static file with the same name as a file in the pages/ directory, as this will result in an error.

## 1.2. Routing

Predefined API routes take precedence over dynamic API routes, and dynamic API routes over catch all API routes.

