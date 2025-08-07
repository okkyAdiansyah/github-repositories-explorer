import HistoryItem from "@components/ui/HistoryItem";

export interface IHistoriesProps {
    histories: string[],
    onSelect: (q: string) => void,
    onRemove: (q: string) => void
}

const Histories : React.FC<IHistoriesProps> = ({histories, onSelect, onRemove}) => {
    if(histories.length === 0) return null;

    return(
        <div 
            className="w-full flex flex-col border-b border-solid border-gray-500"
        >
            <span className="text-base font-medium text-gray-500 p-4">Recent Search</span>
            <ul className="w-full">
                {histories.map((q) => (
                    <li 
                        className="w-full"
                        key={`search-${q}`}
                    >
                        <HistoryItem
                            username={q}
                            onSelect={() => onSelect(q)}
                            onRemove={() => onRemove(q)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )    
}

export default Histories;