import React, { useEffect, useRef, useState } from "react";
import useSearchQuery from "@hooks/useSearchQuery";
import SearchWithSuggestion from "@components/ui/SearchWithSuggestion";
import SubmitButton from "@components/ui/SubmitButton";
import useFetchAPI from "@hooks/useFetchAPI";
import { fetchUsername } from "@lib/services/fetchService";
import type { IResponseUsername } from "@lib/types/response";

const LiveSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);
    const {     
        query,
        pathname,
        histories,
        handleSearchQuery,
        handleResetQuery,
        handleRemoveHistory
    } = useSearchQuery();
    const {result, loading, error} = useFetchAPI<IResponseUsername>({
        queryKey: searchQuery,
        fetchService: fetchUsername,
        debounceTime: 500
    });

    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(pathname === '/search') setSearchQuery(query as string);
    }, [query, pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !container.current.contains(event.target as Node)) {
                setShowSuggestion(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchQuery(searchQuery);
        setShowSuggestion(false);
    }

    const handleOnReset = () => {
        setSearchQuery('');
        handleResetQuery();
        setShowSuggestion(false);
    }

    const handleOnFocus = () => {
        setShowSuggestion(true);
    }
    
    const handleOnSelect = (q: string) => {
        handleSearchQuery(q);
        setShowSuggestion(false)
    }

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    const handleOnRemove = (q: string) => {
        handleRemoveHistory(q);
    }

    return(
        <div 
            ref={container}
            className="w-full flex justify-center"
        >
            <form 
                className="w-full relative flex flex-col gap-y-2 items-center justify-center px-6 py-2 md:w-1/2 md:px-12 md:flex-row md:gap-x-4"
                onSubmit={handleOnSubmit}
            >
                <SearchWithSuggestion
                    showSuggestion={showSuggestion}
                    value={searchQuery}
                    histories={histories}
                    suggestions={result}
                    loading={loading}
                    error={error}
                    onChange={handleQueryChange}
                    onFocus={handleOnFocus}
                    onSelect={handleOnSelect}
                    onRemove={handleOnRemove}
                    onReset={handleOnReset}
                />
                <SubmitButton />
            </form>
        </div>
    )
}

export default LiveSearch;