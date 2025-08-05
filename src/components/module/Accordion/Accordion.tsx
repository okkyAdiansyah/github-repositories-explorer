import AccordionItem from "@components/ui/AccordionItem/AccordionItem";
import ErrorHandler from "@components/ui/ErrorHandler/ErrorHandler";
import Loading from "@components/ui/Loading/Loading";
import useFetchAPI from "@hooks/useFetchAPI";
import { fetchRepo } from "@lib/services/fetchService";
import { type IUserRepo, type IUsernameResult } from "@lib/types/resultTypes";
import { ChevronUp } from "lucide-react";

interface IAccordion extends IUsernameResult {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    activeAccordion: string,
}

const AccordionFallbackWrapper = ({children, isActive} : {children: React.ReactNode, isActive: boolean}) => {
    return(
        <div
            className={`w-full flex bg-gray-600 items-center justify-center overflow-hidden ${isActive ? `max-h-[360px] h-[360px] p-4` : 'max-h-0 px-0'}`}
        >
            {children}
        </div>
    )
}

const LoadingFallback = ({isActive} : {isActive: boolean}) => {
    return(
        <AccordionFallbackWrapper isActive={isActive}>
            <Loading />
        </AccordionFallbackWrapper>
    )
}

const ErrorFallback = ({errorMsg, isActive} : {errorMsg: string, isActive: boolean}) => {
    return(
        <AccordionFallbackWrapper isActive={isActive}>
            <ErrorHandler errorMsg={errorMsg} />
        </AccordionFallbackWrapper>
    )
}

const NoResultFallback = ({isActive} : {isActive: boolean}) => {
    return(
        <AccordionFallbackWrapper isActive={isActive}>
            <p className="text-lg text-gray-300 text-center">No Repositories Found.</p>
        </AccordionFallbackWrapper>
    )
}

const Accordion = ({onClick, activeAccordion, username, id, repoUrl} : IAccordion) => {
    const isActive = activeAccordion === `user-${id}`;
    const {result, loading, error} = useFetchAPI<IUserRepo>({
        shouldFetch: isActive,
        queryKey: repoUrl,
        fetchService: fetchRepo,
        cached: true
    })
    const resultIsEmpty = !loading && result.length === 0;
    
    return(
        <div
            className={`w-full flex flex-col not-last:border-solid not-last:border-b-[1] not-last:border-white`}
        >
            <button
                type="button"
                className={`w-full flex p-4 items-center justify-between ${isActive ? 'bg-gray-950' : 'bg-gray-950/50'} text-lg font-medium text-white cursor-pointer`}
                onClick={onClick}
            >
                {username}
                <ChevronUp
                    size={24}
                    color="#ffffff"
                    className={`transition-transform duration-500 ease-out ${isActive ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>
            {loading && <LoadingFallback isActive={isActive} />}
            {error.isError && <ErrorFallback isActive={isActive} errorMsg={error.errorMsg} />}
            {resultIsEmpty ? 
                <NoResultFallback isActive={isActive} /> :                 
                <ul
                    className={`w-full flex flex-col transition-all duration-500 ease-out ${isActive ? `max-h-[360px] overflow-y-scroll` : 'max-h-0 overflow-hidden'}`}
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