import type React from "react";
import { ExternalLink } from "lucide-react";

interface ICustomOption {
    username: string,
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CustomOption = ({username, onSelect} : ICustomOption) => {
    return(
        <button 
            type="button"
            onClick={onSelect}
            className="w-full p-4 flex items-center justify-between text-base font-normal text-gray-300"
        >
            {username}
            <ExternalLink
                size={24}
                color="#9e9b9b"
            />
        </button>
    )    
}

export default CustomOption;