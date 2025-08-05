import type { IGithubRepo, IGithubUser, IUsernameResult, IUserRepo } from "@lib/types/resultTypes";

const transformUser = (user: IGithubUser) : IUsernameResult => ({
    username: user.login,
    repoUrl: user.repos_url,
    id: user.id
}) 

const transformRepo = (repo: IGithubRepo) : IUserRepo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    repoUrl: repo.html_url,
    watchersCount: repo.watchers_count
})

export const dataTransfrorm = {
    usersList: (data: IGithubUser[]) : IUsernameResult[] => data.map(transformUser),
    reposList: (data: IGithubRepo[]) : IUserRepo[] => data.map(transformRepo),
}