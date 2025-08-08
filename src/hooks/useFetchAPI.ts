import type { IResponseError } from "@lib/types/response";
import { useState, useEffect, useRef } from "react";

interface IUseFetchAPI<T> {
    shouldFetch?: boolean,
    queryKey: string,
    fetchService: (q: string) => Promise<T[]> 
    debounceTime?: number
    cached?: boolean
}

const useFetchAPI = <T>({
    shouldFetch = true,
    queryKey,
    fetchService,
    debounceTime = 0,
    cached = false
} : IUseFetchAPI<T>) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<T[]>([]);
    const [error, setError] = useState<IResponseError>({
        isError: false,
        errorMsg: ''
    });
    const cache = useRef<Map<string, T[]>>(new Map());
    const controller = useRef<AbortController | null>(null);
    const debounce = useRef<NodeJS.Timeout | null>(null);

    const fetch = async (queryKey: string) => {
        try {
            const res = await fetchService(queryKey);
            setResult(res);

            if(cached){
                cache.current.set(queryKey, res);
            }
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') return;

            setError({
                isError: true,
                errorMsg: error instanceof Error ? error.message : String(error)
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!queryKey) return;

        if(!shouldFetch) return;

        if(cached && cache.current.has(queryKey)){
            setResult(cache.current.get(queryKey) ?? []);
            return;
        }

        if(debounce.current) clearTimeout(debounce.current);

        if(controller.current) controller.current.abort();
        const con = new AbortController();
        controller.current = con;
        
        setLoading(true);
        debounce.current = setTimeout(() => {
            fetch(queryKey);
        }, debounceTime);

        return () => {
            if (debounce.current) {
                clearTimeout(debounce.current);
            }
        }

    }, [queryKey, shouldFetch, debounceTime]);

    return {
        result,
        loading,
        error
    }
}

export default useFetchAPI;