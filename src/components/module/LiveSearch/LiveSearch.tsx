import React, { useEffect, useState } from "react";
import Button from "@components/ui/Button/Button";
import SearchInput from "@components/ui/SearchInput/SearchInput";
import LiveSuggestion from "../LiveSuggestion/LiveSuggestion";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const LiveSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [liveIsActive, setLiveIsActive] = useState<boolean>(false);
    const [searchIsActive, setSearchIsActive] = useState<boolean>(false);

    const location = useLocation();
    const currentRoute = location.pathname;
    const navigate = useNavigate();

    const [ param, setParam ] = useSearchParams();
    const query = param.get('q');

    useEffect(() => {
        if(currentRoute === '/search'){
            setSearchQuery(query as string);
        } else {
            return;
        }
    }, [query, currentRoute]);

    const handleOnFocus = () => {
        setSearchIsActive(true);
    }

    const handleOnBlur = () => {
        setSearchIsActive(false);
        setLiveIsActive(false);
    }

    const handleReset = () => {
        if(currentRoute === '/search') setParam({q: ''}); 
        setSearchQuery('');
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            setLiveIsActive(false);
            if(currentRoute !== '/search'){
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            } else {
                setParam({q: searchQuery});
            }
        }
    }

    const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(currentRoute !== '/search'){
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        } else {
            setParam({q: searchQuery});
        }
    }

    const handleOnSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { textContent } = e.currentTarget;
        setSearchQuery(textContent as string);
        setLiveIsActive(false);

        if(currentRoute !== '/search'){
            navigate(`/search?q=${encodeURIComponent(textContent as string)}`);
        } else {
            setParam({q: textContent as string});
        }

    }

    const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
        setLiveIsActive(true);
    }

    return(
        <div className="w-full relative flex flex-col gap-y-2 items-center justify-center px-6 py-2 md:w-1/2 md:px-12 md:flex-row md:gap-x-4">
            <div className="relative w-full">
                <SearchInput
                    value={searchQuery}
                    isActive={searchIsActive}
                    onChange={handleChangeQuery}
                    onReset={handleReset}
                    onKeyPress={handleKeyPress}
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                />
                {liveIsActive && searchQuery ?
                    <LiveSuggestion
                        query={searchQuery}
                        onSelect={handleOnSelect}
                    /> : ''
                }
            </div>
            <Button
                className="w-full py-2 px-8 bg-purple-700 rounded-md font-normal text-base text-white md:w-fit"
                type="submit"
                onClick={handleOnSubmit}
            >
                Search
            </Button>
        </div>
    )
}

export default LiveSearch;