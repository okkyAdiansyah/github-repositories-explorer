import LiveSearch from "@components/module/LiveSearch";

const Home = () => {
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center gap-y-2">
            <section className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-sans text-2xl text-white font-bold text-center md:text-4xl">Search Github Repositories</h1>
                <h2 className="font-sans text-lg text-white font-regular text-center md:text-xl">
                    Find your favorite user repositories via their username.
                </h2>
            </section>
            <LiveSearch />
        </div>
    )
}

export default Home;