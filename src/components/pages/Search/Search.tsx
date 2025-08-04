import { useSearchParams } from "react-router-dom";
import Loading from "@components/ui/Loading/Loading";
import LiveSearch from "@components/module/LiveSearch/LiveSearch";
import useSearch from "@hooks/useSearch";

const Search = () => {
    const [ params ] = useSearchParams();
    const query = params.get('q');
    const {loading, result, error} = useSearch(query as string, 1);

    return(
        <div className="w-full h-auto min-h-screen flex flex-col items-center justify-start gap-y-2 py-8">
            <div className="w-full flex flex-col items-center justify-center gap-y-4">
                <LiveSearch />
                <span className="text-base font-normal text-white">
                    {query !== '' ? `Search result for ${query}` : 'Search result'}
                </span>
                {/* Render if Loading */}
                {loading && <Loading />}

                {/* Render if error is happening */}
                {!loading && error.isError && <p className="text-lg text-gray-300 text-center">{error.errorMsg}</p>}

                {/* Render if no result */}
                {!loading && result.length === 0 && <p className="text-lg text-gray-500 text-center">No users found.</p>}

                {/* Expected render */}
                {!loading && result.length > 0 &&
                    <div>
                        {result.map((user) => (
                            <p key={`user-${user.id}`}>{user.username}</p>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Search;