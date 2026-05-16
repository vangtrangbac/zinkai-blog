import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const sorted = [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Zinkai Notebook",
    description: "Sổ tay IT — blog tĩnh bằng Markdown.",
    site: context.site ?? "https://zinkai.blog",
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>vi-vn</language>`,
  });
}
