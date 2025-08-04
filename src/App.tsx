import { Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home/Home"
import Search from "./components/pages/Search/Search"


function App() {
  return (
    <>
      <main className='w-full max-w-screen overflow-x-hidden antialiased bg-gradient-to-b from-gray-950 to-purple-950'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </>
  )
}

export default App
