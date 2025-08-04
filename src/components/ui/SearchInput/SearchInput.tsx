import { Search, X } from "lucide-react";
import Button from "../Button/Button";

interface ISearchProps {
    value: string | undefined,
    isActive: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onReset: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
}

const SearchInput = ({value, isActive, onChange, onReset, onKeyPress, onBlur, onFocus} : ISearchProps) => {
    return(
        <div 
            className={`w-full p-2 flex items-center gap-x-2 bg-[rgba(36,35,35,.5)] rounded-full border-[1px] ${isActive ? 'border-white shadow-lg shadow-white/25' : 'border-transparent'}`}
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
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange} 
                onKeyDown={onKeyPress}
            />
            <div className="w-6 h-6">
                {value ?
                    <Button
                        type="reset"
                        onClick={onReset}
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