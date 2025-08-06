# Dynamic require of "node:os" error when using @forastro/asciidoc with Astro content collections

## Astro Info

```
Astro                    v5.12.8
Node                     v20.18.0
System                   Linux (x64)
Package Manager          npm
Output                   static
Adapter                  none
Integrations             @astrojs/sitemap
```

## Issue Description

I'm experiencing a build error when trying to use the `@forastro/asciidoc` package with Astro's content collections. The error occurs during the `astro sync` phase when generating content collection types.

### Error Message

```
[GenerateContentTypesError] `astro sync` command failed to generate content collection types: Dynamic require of "node:os" is not supported
  Hint:
    This error is often caused by a syntax error inside your content, or your content configuration file. Check your src/content.config.ts file for typos.
  Error reference:
    https://docs.astro.build/en/reference/errors/generate-content-types-error/
```

### Full Stack Trace

```
  Stack trace:
    at syncContentCollections (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/sync/index.js:219:11)
    at async AstroBuilder.setup (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/build/index.js:100:5)
    at async build (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/build/index.js:45:3)
    at async runCommand (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/cli/index.js:142:7)
  Caused by:
  Dynamic require of "node:os" is not supported
    at eval (/home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/@forastro+asciidoc@2.3.2_astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_types_bb9f723493abc33e9e95b288c1718144/node_modules/@forastro/asciidoc/index.js:7:7238)
```

## Project Setup

### package.json

```json
{
  "name": "dummy-asciidoc-project-node-os-error",
  "type": "module",
  "version": "0.0.1",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/rss": "^4.0.12",
    "@astrojs/sitemap": "^3.4.2",
    "@forastro/asciidoc": "^2.3.2",
    "astro": "^5.12.8",
    "sharp": "^0.34.2"
  }
}
```

### Content Collection Configuration (src/content.config.ts)

```typescript
import { defineCollection } from 'astro:content';
import { asciidocLoader, asciidocBaseSchema } from '@forastro/asciidoc';

const blog = defineCollection({
	// Load Asciidoc files in the `src/content/blog/` directory.
	loader: asciidocLoader('src/content/blog'),
	// Type-check frontmatter using a schema
	schema: asciidocBaseSchema,
});

export const collections = { blog };
```

### Project Structure

```
dummy-asciidoc-project-node-os-error/
├── src/
│   ├── content/
│   │   └── blog/
│   │       └── hello-asciidoc.adoc
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Steps to Reproduce

1. Create a new Astro project
2. Install `@forastro/asciidoc` package
3. Configure content collections to use the asciidoc loader
4. Add any `.adoc` file to the content directory
5. Run `astro build` or `astro sync`

## Analysis

The error appears to stem from the `@forastro/asciidoc` package using a dynamic require statement for the `node:os` module. This dynamic require is incompatible with Vite's ESM module evaluation context used by Astro's content collection system.

The specific issue occurs at line 7:7238 in the minified `@forastro/asciidoc/index.js` file, where there's likely a `require('node:os')` call that cannot be statically analyzed and transformed by Vite.

## Request for Help

I'm seeking guidance on:

1. **Cross-platform path handling**: Are there any recommended cross-platform (Node.js/browser compatible) libraries that could replace the need for `node:os` when handling file paths in content loaders? Something that would work in both SSR and client-side contexts?

2. **Astro/Vite loader context**: Is this a limitation in how Astro's content collection loaders are evaluated, or is there a specific way third-party loaders should be written to avoid this issue?

3. **Workaround suggestions**: Are there any known workarounds for handling Node.js built-in modules in content loaders, or would this require changes to the `@forastro/asciidoc` package itself?

## Environment Details

- **OS**: Linux (Pop!_OS)
- **Node**: v20.18.0
- **Package Manager**: pnpm 10.11.0 (also reproduced with npm)
- **Astro**: 5.12.8
- **@forastro/asciidoc**: 2.3.2

## Additional Context

This issue prevents the use of Asciidoc files with Astro's content collections when using the `@forastro/asciidoc` loader. The error occurs consistently across different environments and package managers.

I'm happy to provide any additional information or test potential solutions. Thank you for your help!
