import React, { useCallback, useState, useEffect } from "react";
import Accordion from "@components/module/Accordion";
import Loading from "@components/ui/Loading";
import ErrorHandler from "@components/ui/ErrorHandler";
import useFetchAPI from "@hooks/useFetchAPI";
import useSearchQuery from "@hooks/useSearchQuery";
import { fetchUsername } from "@lib/services/fetchService";

const SearchResult : React.FC = () => {
    const { query } = useSearchQuery();
    const {result, loading, error} = useFetchAPI({
        queryKey: query as string,
        fetchService: fetchUsername
    })
    const [activeAccordion, setActiveAccordion] = useState<string>(``);
    const resultIsEmpty = result.length === 0;

    useEffect(() => {
        if (result.length > 0) {
            setActiveAccordion(`user-${result[0].id}`);
        }
    }, [result]);

    const handleToggleAccordion = useCallback((target: string) => {
        setActiveAccordion(target);
    }, []); 

    if(loading) return <Loading />
    if(error.isError) return <ErrorHandler errorMsg={error.errorMsg} />
    if(resultIsEmpty) return <p className="text-lg text-gray-500 text-center">No users found.</p>
    
    return(
        <div
            className="w-full px-6 md:w-1/2"
        >
            <ul className="w-full h-auto flex flex-col items-center justify-center">
                {result.map((user) => (
                    <li
                        key={`user-${user.id}`}
                        className="w-full h-auto"
                    >
                        <Accordion
                            id={user.id}
                            username={user.username}
                            activeAccordion={activeAccordion}
                            repoUrl={user.repoUrl}
                            onClick={() => handleToggleAccordion(`user-${user.id}`)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchResult;