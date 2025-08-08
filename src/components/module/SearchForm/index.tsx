import React, { useEffect, useRef, useState } from "react";
import Histories from "@components/module/Histories";
import LiveSuggestion from "@components/module/LiveSuggestion";
import SearchInput from "@components/ui/SearchInput";
import useDropdown from "@hooks/useDropdown";
import useSearchQuery from "@hooks/useSearchQuery";
import SubmitButton from "@components/ui/SubmitButton";

const SearchForm : React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const container = useRef<HTMLDivElement>(null);
    const {toggleDropdown, handleToggleDropdown} = useDropdown(container);
    const {query, pathname, handleSearchQuery, handleResetQuery} = useSearchQuery();

    useEffect(() => {
        if(pathname === '/search') setSearchQuery(query as string);
    }, [query, pathname]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearchQuery(searchQuery);
        handleToggleDropdown();
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    const handleOnReset = () => {
        setSearchQuery('');
        handleResetQuery();
        handleToggleDropdown();
    }

    return(
        <div
            ref={container}
            className="w-full flex justify-center"
        >
            <form 
                action="GET"
                className="w-full relative flex flex-col gap-y-2 items-center justify-center px-6 py-2 md:w-1/2 md:px-12 md:flex-row md:gap-x-4"
                onSubmit={handleOnSubmit}
                onReset={handleOnReset}
            >
                <div
                    className={`w-full relative flex flex-col gap-y-2 bg-[rgba(36,35,35,.5)] rounded-full transition-all duration-500 ease-out`}
                >
                    <SearchInput 
                        value={searchQuery}
                        onFocus={handleToggleDropdown}
                        onChange={handleOnChange}
                    />
                    {toggleDropdown &&
                        <div
                            className="w-full gap-y-2 bg-[rgba(36,35,35)] absolute h-auto z-[2] bottom-0 translate-y-[calc(100%+1rem)] flex flex-col rounded-lg"
                        >
                            <Histories
                                onSelect={handleToggleDropdown}
                            />
                            <LiveSuggestion 
                                searchQuery={searchQuery}
                                onSelect={handleToggleDropdown}
                            />
                        </div>
                    }
                </div>
                <SubmitButton />
            </form>
        </div>
    )
}

export default SearchForm;