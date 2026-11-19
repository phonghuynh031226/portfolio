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

const login = "phonghuynh031226";
const userAgent = "phonghuynh-portfolio";

async function getRecentContributions(token: string) {
  const repositories: Repository[] = [];
  let cursor: string | null = null;

  do {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": userAgent,
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
}

type CommitSearchRepo = {
  full_name: string;
  description: string | null;
  html_url: string;
  private: boolean;
  owner: { login: string };
};

async function searchPublicCommitRepos() {
  const repos = new Map<string, CommitSearchRepo>();
  for (let page = 1; page <= 10; page++) {
    const params = new URLSearchParams({
      q: `author:${login} -user:${login}`,
      per_page: "100",
      page: String(page),
    });
    const response = await fetch(`https://api.github.com/search/commits?${params}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": userAgent },
    });
    if (!response.ok) return page === 1 ? null : [...repos.values()];

    const result: { items: { repository: CommitSearchRepo }[]; total_count: number } =
      await response.json();
    for (const { repository } of result.items) {
      if (!repository.private && repository.owner.login.toLowerCase() !== login) {
        repos.set(repository.full_name.toLowerCase(), repository);
      }
    }
    if (result.items.length < 100 || page * 100 >= result.total_count) break;
  }
  return [...repos.values()];
}

export const getContributedProjects = createServerFn({ method: "GET" }).handler(async () => {
  const token = process.env.GITHUB_PROJECTS_TOKEN;
  const recent = token ? await getRecentContributions(token).catch(() => null) : null;
  if (recent?.length) return recent;

  const repos = await searchPublicCommitRepos().catch(() => null);
  return repos?.map((repo) => ({
    name: repo.full_name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: null,
    language: null,
  })) ?? recent;
});
