import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort((a, b) => {
      const aFeatured = a.data.featured ? 1 : 0;
      const bFeatured = b.data.featured ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      return (
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
      );
    });
};

export default getSortedPosts;
