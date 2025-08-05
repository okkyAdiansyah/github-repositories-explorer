import HistoryItem from "@components/ui/HistoryItem/HistoryItem"
import useSearchQuery from "@hooks/useSearchQuery"

const SearchHistory = () => {
    const { histories, handleSearchQuery, handleRemoveHistory } = useSearchQuery();

    if(histories.length === 0) return null;

    return(
        <div
            className="w-full flex flex-col border-b border-solid border-gray-500"
        >
            <span className="text-base font-medium text-gray-500 pl-4">Recent Search</span>
            <ul className="w-full">
                {histories.map((q) => (
                    <li 
                        className="w-full"
                        key={`search-${q}`}
                    >
                        <HistoryItem
                            username={q}
                            onClick={() => handleSearchQuery(q)}
                            onDelete={() => handleRemoveHistory(q)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchHistory