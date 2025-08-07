import AccordionBody from "@components/ui/AccordionBody";
import AccordionHead from "@components/ui/AccordionHead";
import ErrorHandler from "@components/ui/ErrorHandler";
import Loading from "@components/ui/Loading";
import useFetchAPI from "@hooks/useFetchAPI";
import { fetchRepo } from "@lib/services/fetchService";
import type { IResponseUsername, IResponseUserRepos } from "@lib/types/response";

export interface IAccordionProps extends IResponseUsername {
    onClick: () => void,
    activeAccordion: string,
}

const AccordionWrapper = ({
    username, 
    children, 
    isActive,
    onClick
} : {
    children: React.ReactNode, 
    isActive: boolean, 
    username: string,
    onClick: () => void
}) => {
    return(
        <div
            className={`w-full flex flex-col bg-gray-600 items-center justify-center`}
        >
            <AccordionHead
                isActive={isActive}
                username={username}
                onClick={onClick}
            />
            {children}
        </div>
    )
}

const Accordion : React.FC<IAccordionProps> = ({onClick, activeAccordion, username, id, repoUrl}) => {
    const isActive = activeAccordion === `user-${id}`;
    const {result, loading, error} = useFetchAPI<IResponseUserRepos>({
        shouldFetch: isActive,
        queryKey: repoUrl,
        fetchService: fetchRepo,
        cached: true
    })
    const resultIsEmpty = !loading && result.length === 0;

    if(loading) return (
        <AccordionWrapper
            isActive={isActive}
            username={username}
            onClick={onClick}
        >
            <div className={`w-full flex flex-col items-center justify-center transition-all duration-500 ease-out ${isActive ? `max-h-[360px] h-[240px] p-4` : 'max-h-0 overflow-hidden p-0'}`}>
                <Loading />
            </div>
        </AccordionWrapper>
    );

    if(error.isError) return (
        <AccordionWrapper
            isActive={isActive}
            username={username}
            onClick={onClick}
        >
            <div className={`w-full flex items-center justify-center flex-col transition-all duration-500 ease-out ${isActive ? `max-h-[360px] h-[240px] p-4` : 'max-h-0 overflow-hidden'}`}>
                <ErrorHandler errorMsg={error.errorMsg} />
            </div>
        </AccordionWrapper>
    );

    if(resultIsEmpty) return (
        <AccordionWrapper
            isActive={isActive}
            username={username}
            onClick={onClick}
        >
            <div className={`w-full flex flex-col items-center justify-center transition-all duration-500 ease-out ${isActive ? `max-h-[360px] h-[240px] p-4` : 'max-h-0 overflow-hidden'}`}>
                <p className="text-lg text-gray-300 text-center">No Repositories Found.</p>
            </div>
        </AccordionWrapper>
    );
    
    return(
        <div
            className={`w-full flex flex-col not-last:border-solid not-last:border-b-[1] not-last:border-white`}
        >
            <AccordionWrapper
                isActive={isActive}
                username={username}
                onClick={onClick}
            >
                <ul
                    className={`w-full flex flex-col transition-all duration-500 ease-out ${isActive ? `max-h-[360px] overflow-y-scroll` : 'max-h-0 overflow-hidden'}`}
                >
                    {result.map((user) => (
                        <li
                            className="w-full not-last:border-b-2 not-last:border-solid not-last:border-y-purple-950"
                            key={`user-${user.id}`}
                        >
                            <AccordionBody {...user} />
                        </li>
                    ))}
                </ul>
            </AccordionWrapper>
        </div>
    )
}

export default Accordion;