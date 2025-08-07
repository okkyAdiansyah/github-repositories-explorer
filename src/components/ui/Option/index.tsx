export interface IOptionProps {
    children: React.ReactNode
}

const Option : React.FC<IOptionProps> = ({children}) => {
    return(
        <div className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-gray-950">
            {children}
        </div>
    )
}

export default Option;