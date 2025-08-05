const ErrorHandler = ({errorMsg} : {errorMsg: string}) => {
    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-lg text-gray-300 text-center">{errorMsg}</p>
            <p className="text-lg text-gray-300 text-center">Oops! An error has occured, please try again.</p>            
        </div>
    )
}

export default ErrorHandler;