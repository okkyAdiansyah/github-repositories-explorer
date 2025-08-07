import Loading from "@components/ui/Loading";
import ErrorHandler from "@components/ui/ErrorHandler";
import type { IResponseError, IResponseUsername } from "@lib/types/response";
import SuggestionItem from "../SuggestionItem";

export interface ILiveSuggestionProps {
    suggestions: IResponseUsername[],
    onSelect: (q: string) => void,
    loading: boolean,
    error: IResponseError
}

const LiveSuggestionWrapper = ({children} : {children: React.ReactNode}) => {
    return(
        <div
            className="absolute w-full h-auto bg-gray-700 z-[2] bottom-0 translate-y-[calc(100%+8px)] flex flex-col py-4"
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

const LiveSuggestion : React.FC<ILiveSuggestionProps> = ({suggestions, loading, error, onSelect}) => {
    const suggestionIsEmpty = suggestions.length === 0

    if(loading) return <LoadingFallback />

    if(error.isError) return <ErrorFallback errorMsg={error.errorMsg} />

    if(suggestionIsEmpty) return <EmptyFallback />

    return(
        <LiveSuggestionWrapper>
            <ul className="w-full items-center justify-center">
                {suggestions.map((item) => (
                    <li
                        key={`item-${item.id}`}
                    >
                        <SuggestionItem 
                            username={item.username}
                            onSelect={() => {
                                onSelect(item.username)
                            }}
                        />
                    </li>
                ))}
            </ul>
        </LiveSuggestionWrapper>
    )
}

export default LiveSuggestion;