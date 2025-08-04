import AccordionItem from "@components/ui/AccordionItem/AccordionItem";
import Loading from "@components/ui/Loading/Loading";
import useRepoFetch from "@hooks/useRepoFetch";
import type { IUsernameResult } from "@lib/types/resultTypes";
import { ChevronUp } from "lucide-react";

interface IAccordion extends IUsernameResult {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    activeAccordion: string,
}

const LoadingFallback = ({isActive} : {isActive: boolean}) => {
    return(
        <div className={`w-full flex bg-gray-600 justify-between overflow-hidden ${isActive ? `max-h-[120px] p-4` : 'max-h-0 px-0'}`}>
            <Loading />
        </div>
    )
}

const ErrorFallback = ({errorMsg, isActive} : {errorMsg: string, isActive: boolean}) => {
    return(
        <div className={`w-full flex bg-gray-600 justify-between overflow-hidden ${isActive ? `max-h-[120px] p-4` : 'max-h-0 px-0'}`}>
            <p className="text-lg text-gray-300 text-center">{errorMsg}</p>
        </div>
    )
}

const NoResultFallback = ({isActive} : {isActive: boolean}) => {
    return(
        <div className={`w-full flex bg-gray-600 justify-between overflow-hidden ${isActive ? `max-h-[120px] p-4` : 'max-h-0 px-0'}`}>
            <p className="text-lg text-gray-300 text-center">No Repositories Found.</p>
        </div>
    )
}

const Accordion = ({onClick, activeAccordion, username, id, repoUrl} : IAccordion) => {
    const identifier = `user-${id}`;
    const shouldFetch = activeAccordion === identifier;
    const {result, loading, error} = useRepoFetch(repoUrl, shouldFetch);
    
    return(
        <div
            className={`w-full flex flex-col not-last:border-solid not-last:border-b-[1] not-last:border-white`}
        >
            <button
                type="button"
                className={`w-full flex p-4 items-center justify-between ${activeAccordion === identifier ? 'bg-gray-950' : 'bg-gray-950/50'} text-lg font-medium text-white`}
                onClick={onClick}
            >
                {username}
                <ChevronUp
                    size={24}
                    color="#ffffff"
                    className={`transition-transform duration-500 ease-out ${activeAccordion === identifier ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
            {/* Render if Loading */}
            {loading && <LoadingFallback isActive={activeAccordion === identifier} />}
            {/* Render if error is happening */}
            {!loading && error.isError && <ErrorFallback isActive={activeAccordion === identifier} errorMsg={error.errorMsg} />}
            {/* Render if no result */}
            {!loading && result.length === 0 && <NoResultFallback isActive={activeAccordion === identifier} />}
            {/* Expected render */}
            {!loading && result.length > 0 &&
                <ul
                    className={`w-full flex flex-col transition-all duration-500 ease-out ${activeAccordion === identifier ? `max-h-[360px] overflow-y-scroll` : 'max-h-0 overflow-hidden'}`}
                >
                    {result.map((user) => (
                        <li
                            className="w-full not-last:border-b-2 not-last:border-solid not-last:border-y-purple-950"
                            key={`user-${user.id}`}
                        >
                            <AccordionItem {...user} />
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Accordion;