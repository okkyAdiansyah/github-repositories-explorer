import ErrorHandler from "@components/ui/ErrorHandler"
import Loading from "@components/ui/Loading"
import useSearchQuery from "@hooks/useSearchQuery"
import useFetchAPI from "@hooks/useFetchAPI"
import { fetchUsername } from "@lib/services/fetchService"
import type { IResponseUsername } from "@lib/types/response"
import SuggestionItem from "@components/ui/SuggestionItem"

export interface ILiveSuggestionProps {
    searchQuery: string,
    onSelect: () => void
}

const LiveSuggestionWrapper = ({children} : {children: React.ReactNode}) => {
    return(
        <div
            className="w-full h-auto flex flex-col py-4"
        >
            {children}
        </div>
    )
}

const ErrorFallback = ({errorMsg} : {errorMsg: string}) => {
    return(
        <LiveSuggestionWrapper>
            <ErrorHandler errorMsg={errorMsg} />
        </LiveSuggestionWrapper>
    )
}

const LoadingFallback = () => {
    return(
        <LiveSuggestionWrapper>
            <Loading />
        </LiveSuggestionWrapper>
    )
}

const EmptyFallback = () => {
    return(
        <LiveSuggestionWrapper>
            <p className="text-lg text-gray-500 text-center">No users found.</p>
        </LiveSuggestionWrapper>
    )
}


const LiveSuggestion : React.FC<ILiveSuggestionProps> = ({searchQuery, onSelect}) => {
    const { handleSearchQuery } = useSearchQuery();
    const { result, loading, error } = useFetchAPI<IResponseUsername>({
        queryKey: searchQuery,
        fetchService: fetchUsername,
        debounceTime: 500
    })
    const resultIsEmpty = result.length === 0;

    if(loading) return <LoadingFallback />

    if(error.isError) return <ErrorFallback errorMsg={error.errorMsg} />

    if(resultIsEmpty) return <EmptyFallback />

    return(
        <LiveSuggestionWrapper>
            <ul className="w-full items-center justify-center">
                {result.map((item) => (
                    <li
                        key={`item-${item.id}`}
                    >
                        <SuggestionItem 
                            username={item.username}
                            onSelect={() => {
                                handleSearchQuery(item.username);
                                onSelect()
                            }}
                        />
                    </li>
                ))}
            </ul>
        </LiveSuggestionWrapper>
    )
}

export default LiveSuggestion;