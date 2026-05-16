import { getCollection, type CollectionEntry } from "astro:content";

export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog");
  if (import.meta.env.PROD) {
    return posts.filter((p) => !p.data.draft);
  }
  return posts;
}

const UNCATEGORIZED = "Không phân loại";
const NO_SUB_KEY = "\0__none__\0";

export type CategoryBranch = {
  category: string;
  subcategories: {
    label: string | null;
    posts: CollectionEntry<"blog">[];
  }[];
}[];

export function buildCategoryBranches(
  posts: CollectionEntry<"blog">[]
): CategoryBranch {
  const sorted = [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  const map = new Map<string, Map<string, CollectionEntry<"blog">[]>>();

  for (const p of sorted) {
    const cat = p.data.category?.trim() || UNCATEGORIZED;
    const subRaw = p.data.subcategory?.trim();
    const subKey = subRaw || NO_SUB_KEY;
    if (!map.has(cat)) map.set(cat, new Map());
    const sm = map.get(cat)!;
    if (!sm.has(subKey)) sm.set(subKey, []);
    sm.get(subKey)!.push(p);
  }

  const sortCat = (a: string, b: string) => {
    if (a === UNCATEGORIZED) return 1;
    if (b === UNCATEGORIZED) return -1;
    return a.localeCompare(b, "vi");
  };

  const sortSub = (a: string, b: string) => {
    if (a === NO_SUB_KEY) return -1;
    if (b === NO_SUB_KEY) return 1;
    return a.localeCompare(b, "vi");
  };

  return [...map.keys()].sort(sortCat).map((category) => {
    const sm = map.get(category)!;
    const subKeys = [...sm.keys()].sort(sortSub);
    return {
      category,
      subcategories: subKeys.map((key) => ({
        label: key === NO_SUB_KEY ? null : key,
        posts: sm.get(key)!,
      })),
    };
  });
}
