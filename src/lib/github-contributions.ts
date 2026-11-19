import { createServerFn } from "@tanstack/react-start";

type Repository = {
  nameWithOwner: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  owner: { login: string };
  isPrivate: boolean;
};

type RepositoryPage = {
  nodes: Repository[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
};

export const getContributedProjects = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.GITHUB_PROJECTS_TOKEN;
  if (!token) return null;

  const login = "phonghuynh031226";
  const repositories: Repository[] = [];
  let cursor: string | null = null;

  do {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "phonghuynh-portfolio",
      },
      body: JSON.stringify({
        query: `
          query ($login: String!, $cursor: String) {
            user(login: $login) {
              repositoriesContributedTo(
                first: 100
                after: $cursor
                includeUserRepositories: false
                privacy: PUBLIC
                contributionTypes: [COMMIT, PULL_REQUEST]
              ) {
                nodes {
                  nameWithOwner
                  description
                  url
                  homepageUrl
                  primaryLanguage { name }
                  owner { login }
                  isPrivate
                }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        `,
        variables: { login, cursor },
      }),
    });

    if (!response.ok) return null;

    const result: {
      errors?: unknown[];
      data?: { user: { repositoriesContributedTo: RepositoryPage } | null };
    } = await response.json();
    const page: RepositoryPage | undefined = result.data?.user?.repositoriesContributedTo;
    if (result.errors?.length || !page) return null;
    repositories.push(...page.nodes);
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (cursor);

  return repositories
    .filter((repo) => !repo.isPrivate && repo.owner.login.toLowerCase() !== login)
    .map((repo) => ({
      name: repo.nameWithOwner,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name ?? null,
    }));
});
