import { useState, useEffect } from "react";
import { type IUsernameResult, type IGithubUser, type IGitHubSearchResponse } from "@lib/types/resultTypes";
import axios from "axios";
import type { TError } from "./useLiveSearch";

const useSearch = (query: string, page: number = 1) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<IUsernameResult[]>([]);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    const fetch = async (query: string, page: number) => {
        try {
            const res = await axios.get<IGitHubSearchResponse>(`https://api.github.com/search/users?q=${query}+in:login&per_page=5&page=${page}`);
            const data = res.data.items;
            const formatted: IUsernameResult[] = data.map((acc : IGithubUser) => ({username: acc.login, repoUrl: acc.url, id: acc.id}));

            setResult(formatted);
        } catch (error) {
            setError({
                isError: true,
                errorMsg: (error as Error).message
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!query){
            setResult([]);
            return;
        }

        setLoading(true);
        fetch(query, page);
    }, [query, page])

    return {loading, result, error}
}

export default useSearch;