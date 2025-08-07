import { History, X } from "lucide-react";

export interface IHistoryItemsProps {
    username: string,
    onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const HistoryItem : React.FC<IHistoryItemsProps> = ({username, onSelect, onRemove}) => {
    return(
        <div
            className="w-full flex items-center p-4 hover:bg-gray-950"
        >
            <button 
                type="button"
                className="flex items-center justify-between grow text-base font-normal text-gray-300 cursor-pointer"
                onClick={onSelect}
            >
                {username}
                <History
                    size={24}
                    color="#9e9b9b"
                />
            </button>
            <button
                type="button"
                className="flex items-center justify-center cursor-pointer"
                onClick={onRemove}
            >
                <X
                    size={24}
                    color="#9e9b9b"
                />
            </button>
        </div>
    )
}

export default HistoryItem;