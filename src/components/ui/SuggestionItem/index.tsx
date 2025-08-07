import Option from "@components/ui/Option";
import { ExternalLink } from "lucide-react";

export interface ISuggestionsItemProps {
    username: string,
    onSelect: () => void
}

const SuggestionItem : React.FC<ISuggestionsItemProps> = ({username, onSelect}) => {
    return(
        <Option>
            <button 
                type="button" 
                className="text-base font-normal text-gray-300 cursor-pointer"
                onClick={onSelect}
                value={username}
            >
                {username}
            </button>
            <ExternalLink
                size={24}
                color="#9e9b9b"
            />
        </Option>
    )
}

export default SuggestionItem;