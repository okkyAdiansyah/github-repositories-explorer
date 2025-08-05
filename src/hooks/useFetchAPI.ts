import { useState, useEffect } from "react";

export type TError = {
    isError: boolean;
    errorMsg: string;
}

interface IUseFetchAPI<T> {
    shouldFetch?: boolean,
    queryKey: string,
    fetchService: (q: string) => Promise<T[]> 
    debounceTime?: number
    cached?: boolean
}

const cache = new Map<string, boolean>();

const useFetchAPI = <T>({
    shouldFetch = true,
    queryKey,
    fetchService,
    debounceTime = 0,
    cached = false
} : IUseFetchAPI<T>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<T[]>([]);
    const [error, setError] = useState<TError>({
        isError: false,
        errorMsg: ''
    });

    const fetch = async (queryKey: string) => {
        try {
            const res = await fetchService(queryKey);
            setResult(res);

            if(cached){
                cache.set(queryKey, true);
            }
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
        if(!queryKey){
            setResult([]);
            return;
        }

        if(!shouldFetch || cache.get(queryKey)) return;
        
        setLoading(true);
        const debounce = setTimeout(() => {
            fetch(queryKey);
        }, debounceTime);

        return () => {
            clearTimeout(debounce);
        }

    }, [queryKey, shouldFetch, debounceTime]);

    return {
        result,
        loading,
        error
    }
}

export default useFetchAPI;