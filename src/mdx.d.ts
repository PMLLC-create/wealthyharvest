declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title: string;
    description: string;
    category: string;
    publishedAt: string;
    coverImage?: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
