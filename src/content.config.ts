import { defineCollection } from 'astro:content';
import { asciidocLoader, asciidocBaseSchema } from '@forastro/asciidoc';

const blog = defineCollection({
	// Load Asciidoc files in the `src/content/blog/` directory.
	loader: asciidocLoader('src/content/blog'),
	// Type-check frontmatter using a schema
	schema: asciidocBaseSchema,
});

export const collections = { blog };
