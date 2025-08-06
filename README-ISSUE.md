# Node:os Dynamic Require Error with @forastro/asciidoc in Astro 5.12.8

This repository demonstrates a bug when using the `@forastro/asciidoc` package with Astro's content collections.

## Error Description

When attempting to use `@forastro/asciidoc` loader in Astro 5.12.8, the build process fails with:

```
[GenerateContentTypesError] `astro sync` command failed to generate content collection types: Dynamic require of "node:os" is not supported
```

## Steps to Reproduce

1. Clone this repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Try to build the project:
   ```bash
   pnpm build
   ```

## Expected Behavior

The Asciidoc loader should work with Astro's content collections, allowing Asciidoc files to be processed and included in the build.

## Actual Behavior

The build fails with a "Dynamic require of node:os is not supported" error during the content collection type generation phase.

## Environment

- **Astro version**: 5.12.8
- **@forastro/asciidoc version**: 2.3.2
- **Node version**: v20.18.0
- **Package manager**: pnpm 10.11.0
- **Operating System**: Linux (Pop!_OS)

## Configuration

The content collection configuration in `src/content.config.ts`:

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

## Full Error Stack Trace

```
[GenerateContentTypesError] `astro sync` command failed to generate content collection types: Dynamic require of "node:os" is not supported
  Hint:
    This error is often caused by a syntax error inside your content, or your content configuration file. Check your src/content.config.ts file for typos.
  Error reference:
    https://docs.astro.build/en/reference/errors/generate-content-types-error/
  Location:
    /home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/sync/index.js:219:11
  Stack trace:
    at syncContentCollections (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/sync/index.js:219:11)
    at async AstroBuilder.setup (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/build/index.js:100:5)
    at async build (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/core/build/index.js:45:3)
    at async runCommand (file:///home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_typescript@5.9.2/node_modules/astro/dist/cli/index.js:142:7)
  Caused by:
  Dynamic require of "node:os" is not supported
    at eval (/home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/@forastro+asciidoc@2.3.2_astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_types_bb9f723493abc33e9e95b288c1718144/node_modules/@forastro/asciidoc/index.js:7:7238)
    at eval (/home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/@forastro+asciidoc@2.3.2_astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_types_bb9f723493abc33e9e95b288c1718144/node_modules/@forastro/asciidoc/index.js:22:2417)
    at eval (/home/shelton-louis/Desktop/dummy-asciidoc-project-node-os-error/node_modules/.pnpm/@forastro+asciidoc@2.3.2_astro@5.12.8_@types+node@24.2.0_jiti@2.5.1_rollup@4.46.2_types_bb9f723493abc33e9e95b288c1718144/node_modules/@forastro/asciidoc/index.js:7:7351)
```

## Additional Context

The error appears to be related to how Vite's module runner handles dynamic requires in the `@forastro/asciidoc` package. The package appears to have a dynamic require statement for the `node:os` module that is incompatible with the ESM module evaluation context used by Astro's content collection system.

## Potential Solution

The issue might be resolved by:
1. Updating the `@forastro/asciidoc` package to use static imports instead of dynamic requires
2. Or implementing a workaround in Astro's content collection loader system to handle such cases
