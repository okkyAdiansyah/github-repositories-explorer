import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import SearchInput from "../../ui/SearchInput/SearchInput";
import { useNavigate } from "react-router-dom";

const DefaultSearch = ({param} : {param: string}) => {
    const [searchQuery, setSearchQuery] = useState<string>(param ?? '');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchQuery(value);
    }

    const handleResetQuery = () => {
        setSearchQuery('');
    }

    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    }

    const handleQuerySubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }

    return(
        <div className="w-full flex flex-col gap-y-2 items-center justify-center px-6 py-2 md:w-1/2 md:px-12 md:flex-row md:gap-x-4">
            <SearchInput 
                value={searchQuery}
                onChange={handleInputChange}
                onReset={handleResetQuery}
                onKeyPress={handleEnterPress}
            />
            <Button
                type="submit"
                className="w-full py-2 px-8 bg-purple-700 rounded-md font-normal text-base text-white md:w-fit"
                onClick={handleQuerySubmit}
            >
                Search
            </Button>
        </div>
    )
}

export default DefaultSearch;