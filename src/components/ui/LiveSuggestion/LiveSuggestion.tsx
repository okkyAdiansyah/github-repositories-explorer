import Loading from "@components/ui/Loading/Loading";
import { type TError } from "@hooks/useLiveSearch";
import SearchHistory from "../../module/SearchHistory/SearchHistory";
import ErrorHandler from "@components/ui/ErrorHandler/ErrorHandler";

interface ILiveSuggestion {
    loading: boolean,
    error: TError,
    children: React.ReactNode
}

const LiveSuggestionWrapper = ({children} : {children: React.ReactNode}) => {
    return(
        <div
            className="absolute w-full h-auto bg-gray-700 z-[2] bottom-0 translate-y-[calc(100%+8px)] flex flex-col py-4"
        >
            <SearchHistory />
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

const LiveSuggestion = ({loading, error, children} : ILiveSuggestion) => {

    if(loading) return <LoadingFallback />

    if(error.isError) return <ErrorFallback errorMsg={error.errorMsg} />

    return(
        <LiveSuggestionWrapper>
            {children}
        </LiveSuggestionWrapper>
    )
}

export default LiveSuggestion;