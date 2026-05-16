import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE_ORIGIN, BASE_SEGMENT } from "../../deploy-path.mjs";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  const sorted = [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const deployBase = new URL(`${BASE_SEGMENT}/`, `${SITE_ORIGIN}/`);
  const siteStr = deployBase.href.replace(/\/$/, "");

  return rss({
    title: "Zinkai Notebook",
    description: "Sổ tay IT — blog tĩnh bằng Markdown.",
    site: siteStr,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: new URL(`blog/${post.slug}/`, deployBase).href,
    })),
    customData: `<language>vi-vn</language>`,
  });
}
