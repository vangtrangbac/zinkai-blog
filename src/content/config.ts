import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** Danh mục lớn (ví dụ: Dev tools, Blog) */
    category: z.string().optional(),
    /** Danh mục con — optional; bài không ghi sẽ nằm trực tiếp dưới category */
    subcategory: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
