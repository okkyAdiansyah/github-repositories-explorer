import React, { useEffect, useRef, useState } from "react";
import Button from "@components/ui/Button/Button";
import SearchInput from "@components/ui/SearchInput/SearchInput";
import LiveSuggestion from "../LiveSuggestion/LiveSuggestion";
import useSearchQuery from "@hooks/useSearchQuery";
import CustomOption from "@components/ui/CustomOption/CustomOption";
import useFetchAPI from "@hooks/useFetchAPI";
import type { IUsernameResult } from "@lib/types/resultTypes";
import { fetchUsername } from "@lib/services/fetchService";

const LiveSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [liveIsActive, setLiveIsActive] = useState<boolean>(false);
    const container = useRef<HTMLDivElement>(null);
    const {     
        query,
        pathname,
        handleSearchQuery,
        handleResetQuery,
        } = useSearchQuery();
    const {result, loading, error} = useFetchAPI<IUsernameResult>({
        queryKey: searchQuery,
        fetchService: fetchUsername,
        debounceTime: 500
    });
    const resultIsEmpty = result.length === 0 && !error.isError;
    const shouldShowSuggestion = liveIsActive && searchQuery;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !container.current.contains(event.target as Node)) {
                setLiveIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if(pathname === '/search') setSearchQuery(query as string);
    }, [query, pathname]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setLiveIsActive(false);
            handleSearchQuery(searchQuery);
        }
    }

    const handleOnReset = () => {
        handleResetQuery();
        setLiveIsActive(false);
        setSearchQuery('');
    }

    const handleOnSubmit = () => {
        handleSearchQuery(searchQuery);
        setLiveIsActive(false);
    }

    const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
        setLiveIsActive(true);
    }

    const handleOnSelect = (q: string) => {
        handleSearchQuery(q)
        setLiveIsActive(false);
    }

    return(
        <div
            ref={container} 
            className="w-full relative flex flex-col gap-y-2 items-center justify-center px-6 py-2 md:w-1/2 md:px-12 md:flex-row md:gap-x-4"
        >
            <div className="relative w-full">
                <SearchInput
                    value={searchQuery}
                    onChange={handleChangeQuery}
                    onReset={handleOnReset}
                    onKeyPress={handleKeyPress}
                />
                {shouldShowSuggestion &&
                    <LiveSuggestion
                        loading={loading}
                        error={error}
                    >
                        {resultIsEmpty && <p className="text-lg text-gray-500 text-center">No users found.</p>}
                        <ul className="w-full items-center justify-center">
                            {result.map((user) => (
                                <li className="w-full cursor-pointer" key={`user-${user.id}`}>
                                    <CustomOption
                                        username={user.username}
                                        onSelect={() => handleOnSelect(user.username)}
                                    />
                                </li>     
                            ))}
                        </ul>
                    </LiveSuggestion>
                }
            </div>
            <Button
                className="w-full py-2 px-8 bg-purple-700 rounded-md font-normal text-base text-white cursor-pointer md:w-fit"
                type="submit"
                onClick={handleOnSubmit}
            >
                Search
            </Button>
        </div>
    )
}

export default LiveSearch;