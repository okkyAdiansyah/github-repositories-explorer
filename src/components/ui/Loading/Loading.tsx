const Loading = () => {
    return(
        <div className="w-full flex items-center justify-center">
            <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-[10px] border-solid border-white border-t-purple-950 animate-spin "></div>
            </div>
        </div>
    )
}

export default Loading;