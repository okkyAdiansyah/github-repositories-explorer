import SearchResult from "@components/module/SearchResult";
import SearchForm from "@components/module/SearchForm";
import useSearchQuery from "@hooks/useSearchQuery";

const Search = () => {
    const { query } = useSearchQuery();

    return(
        <div className="w-full h-auto min-h-screen overflow-y-auto flex flex-col items-center justify-start gap-y-2 py-8">
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <SearchForm />
                <span className="text-base font-normal text-white">
                    {query !== '' ? `Search result for ${query}` : 'Search result'}
                </span>
                <SearchResult />
            </div>
        </div>
    )
}

export default Search;