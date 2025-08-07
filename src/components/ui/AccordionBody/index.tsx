import type { IResponseUserRepos } from "@lib/types/response";
import { Star } from "lucide-react";

const AccordionBody : React.FC<IResponseUserRepos> = ({
    id,
    name,
    description,
    repoUrl,
    watchersCount
}) => {
    return(
        <div
            className="w-full h-[120px] flex bg-gray-600 justify-between p-4 cursor-pointer"
            id={`${id}`}
        >
            <a href={repoUrl} className="flex flex-col">
                <span className="text-lg font-medium text-white">{name}</span>
                <span className="text-base font-light text-white ">
                    {description !== null ? description : 'No description for this repositories'}
                </span>
            </a>
            <div className="flex gap-x-2">
                <span className="text-lg font-medium text-white">{watchersCount}</span>
                <Star
                    size={24}
                    color="#ffffff"
                    className="fill-white"
                />
            </div>
        </div>
    )
}

export default AccordionBody;