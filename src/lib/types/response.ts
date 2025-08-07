export interface IResponseUserRepos {
    id: number,
    name: string,
    description: string | null,
    repoUrl: string,
    watchersCount: number
}

export interface IResponseUsername {
    id: number,
    username: string,
    repoUrl: string
}

export interface IResponseError {
    isError: boolean,
    errorMsg: string
}