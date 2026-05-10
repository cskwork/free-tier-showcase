import type { NextConfig } from "next";

/**
 * GitHub Actions sets GITHUB_REPOSITORY = "owner/repo". For project pages
 * (foo.github.io/repo-name) the site lives under "/repo-name" so we need a
 * basePath. For user/org pages (owner.github.io repo) the site is at root.
 * Local dev has no GITHUB_REPOSITORY set, so basePath is empty.
 */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserOrOrgPage = repo?.endsWith(".github.io");
const basePath = repo && !isUserOrOrgPage ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
