import SearchInput from "@components/ui/SearchInput";
import Histories from "@components/ui/Histories";
import type { IResponseError, IResponseUsername } from "@lib/types/response";
import LiveSuggestion from "../LiveSuggestion";

export interface ISearchWithSuggestionProps {
    value: string,
    showSuggestion: boolean,
    histories: string[],
    suggestions: IResponseUsername[],
    loading: boolean,
    error: IResponseError,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onReset: () => void,
    onSelect: (q: string) => void,
    onRemove: (q: string) => void
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void,
}

const SearchWithSuggestion : React.FC<ISearchWithSuggestionProps> = ({
    value,
    showSuggestion,
    histories,
    suggestions,
    loading,
    error,
    onChange, 
    onReset, 
    onSelect,
    onRemove,
    onFocus
}) => {
    return(
        <div
            className={`w-full relative flex flex-col gap-y-2 bg-[rgba(36,35,35,.5)] rounded-full transition-all duration-500 ease-out`}
        >
            <SearchInput 
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onInputReset={onReset}
            />
            {showSuggestion &&
                <div
                    className="w-full gap-y-2 bg-[rgba(36,35,35)] absolute h-auto z-[2] bottom-0 translate-y-[calc(100%+1rem)] flex flex-col rounded-lg"
                >
                    <Histories
                        histories={histories}
                        onSelect={onSelect}
                        onRemove={onRemove}
                    />
                    <LiveSuggestion
                        suggestions={suggestions}
                        loading={loading}
                        error={error}
                        onSelect={onSelect}
                    />
                </div>
            }
        </div>
    )
}

export default SearchWithSuggestion;