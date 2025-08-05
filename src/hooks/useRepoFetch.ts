import { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { IUserRepo, IGithubRepo } from "@lib/types/resultTypes";
import type { TError } from "./useLiveSearch";

const cache = new Map<string, IUserRepo[]>()

const useRepoFetch = (url: string, shouldFetch: boolean) => {
    const [result, setResult] = useState<IUserRepo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    const hasFetched = useRef(false);

    const fetch = async (url: string) => {
        try {
            const res = await axios.get(url);
            const data: IGithubRepo[] = res.data;

            const formatted: IUserRepo[] = data.map((user) => ({
                id: user.id,
                name: user.name,
                description: user.description,
                repoUrl: user.html_url,
                watchersCount: user.watchers_count
            }));

            setResult(formatted ?? []);
            hasFetched.current = true;
        } catch {
            setError({
                isError: true,
                errorMsg: 'Something went wrong! Please try again.'
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!shouldFetch || hasFetched.current || !url) return;
        
        const cached = cache.get(url);
        if(cached){
            setResult(cached);
            return;
        }

        setLoading(true);
        setError({ isError: false, errorMsg: "" });
        fetch(url);
    }, [url, shouldFetch]);

    return {result, loading, error}
}

export default useRepoFetch;