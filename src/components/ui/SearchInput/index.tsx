import { Search, X } from "lucide-react";
import type { InputHTMLAttributes } from "react";

const SearchInput : React.FC<InputHTMLAttributes<HTMLInputElement>> = ({value, ...rest}) => {
    return(
        <div 
            className={`w-full p-2 flex items-center gap-x-2 bg-transparent rounded-full border-[1px] border-transparent transition-all duration-500 ease-out has-focus:border-white has-focus:shadow-lg has-focus:shadow-white/25`}
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
                {...rest}
            />
            <div className="w-6 h-6">
                {value &&
                    <button 
                        type="reset"
                        className="cursor-pointer"   
                    >
                        <X 
                            size={24}
                            color="#ffffff"
                        />
                    </button>
                }
            </div>
        </div>
    )
}

export default SearchInput;