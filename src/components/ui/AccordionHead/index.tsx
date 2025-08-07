import { ChevronUp } from "lucide-react";

export interface IAccordionHeadProps {
    username: string,
    onClick: () => void,
    isActive: boolean
}

const AccordionHead : React.FC<IAccordionHeadProps> = ({username, onClick, isActive}) => {
    return(
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
    )
} 

export default AccordionHead;