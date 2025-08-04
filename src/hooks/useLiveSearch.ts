import { useState, useEffect } from "react";
import type { IUsernameResult, IGithubUser } from "@lib/types/resultTypes";
import axios from "axios";

export type TError = {
    isError: boolean,
    errorMsg: string
}

const useLiveSearch = (query: string) => {
    const [result, setResult] = useState<IUsernameResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    // Fetch handler
    const fetch = async (query: string) => {
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${query}+in:login&per_page=5`);
            const data: IGithubUser[] = res.data.items;

            const formatted: IUsernameResult[] = data.map((user) => ({
                username: user.login,
                repoUrl: user.repos_url,
                id: user.id
            }));

            setResult(formatted ?? []);
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
        setLoading(true);
        const debounce = setTimeout(() => {
            if(query.trim() !== ''){
                fetch(query);
            } else {
                setLoading(false);
            }
        }, 500)
        
        return () => clearTimeout(debounce);
    }, [query]);
    
    return {result, loading, error}
}

export default useLiveSearch;