import type React from "react";
import CustomOption from "@components/ui/CustomOption/CustomOption";
import Loading from "@components/ui/Loading/Loading";
import useLiveSearch from "@hooks/useLiveSearch";

interface ILiveSuggestion {
    query: string,
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const LiveSuggestion = ({query, onSelect} : ILiveSuggestion) => {
    const {result, loading, error} = useLiveSearch(query);

    return(
        <div
            className="absolute w-full h-auto bg-gray-700 z-[2] bottom-0 translate-y-[calc(100%+8px)] flex items-center justify-center py-4"
        >
            {/* Render if Loading */}
            {loading && <Loading />}

            {/* Render if error is happening */}
            {!loading && error.isError && <p className="text-lg text-gray-300 text-center">{error.errorMsg}</p>}
            
            {/* Render if no result */}
            {!loading && result.length === 0 && <p className="text-lg text-gray-500 text-center">No users found.</p>}

            {/* Expected render */}
            {!loading && result.length > 0 &&
                <ul className="w-full">
                    {result.map((user) => (
                        <li className="w-full" key={`user-${user.id}`}>
                            <CustomOption
                                username={user.username}
                                onSelect={onSelect}
                            />
                        </li>     
                    ))}
                </ul>
            }
        </div>
    )
}

export default LiveSuggestion;