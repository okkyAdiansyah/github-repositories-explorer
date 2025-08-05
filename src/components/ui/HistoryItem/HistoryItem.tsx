import { History, X } from "lucide-react";

interface IHistoryItem {
    username: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const HistoryItem = ({username, onClick, onDelete} : IHistoryItem) => {
    return(
        <div
            className="w-full flex items-center p-4"
        >
            <button 
                type="button"
                className="flex items-center justify-between grow text-base font-normal text-gray-300 cursor-pointer"
                onClick={onClick}
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
                onClick={onDelete}
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