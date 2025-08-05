import { Search, X } from "lucide-react";
import Button from "../Button/Button";

interface ISearchProps {
    value: string | undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onReset: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const SearchInput = ({value, onChange, onReset, onKeyPress} : ISearchProps) => {
    return(
        <div 
            className={`w-full p-2 flex items-center gap-x-2 bg-[rgba(36,35,35,.5)] rounded-full border-[1px] border-transparent has-focus:border-white has-focus:shadow-lg has-focus:shadow-white/25 transition-all duration-500 ease-out`}
        >
            <Search
                size={'24px'}
                color="#ffffff"
            />
            <input 
                type="text" 
                name="search"
                placeholder="Search..."
                value={value} 
                className="w-full p-1 text-base text-white placeholder:text-gray-500 outline-none"
                onChange={onChange} 
                onKeyDown={onKeyPress}
            />
            <div className="w-6 h-6">
                {value ?
                    <Button
                        type="reset"
                        onClick={onReset}
                        className="cursor-pointer"
                    >
                        <X 
                            size={24}
                            color="#ffffff"
                        />
                    </Button> : ''
                }
            </div>           
        </div>
    )
}

export default SearchInput;