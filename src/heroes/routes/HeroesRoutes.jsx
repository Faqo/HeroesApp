import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"
import { DcPage } from "../pages/DcPage"
import { MarvelPage } from "../pages/MarvelPage"

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
            <Routes>
                <Route path="marvel" element={<MarvelPage />} />
                <Route path="dc" element={<DcPage />} />
                <Route path="search" element={<DcPage />} />
                <Route path="hero" element={<DcPage />} />
                
                <Route path="/" element={<Navigate to='/marvel' />} />
            </Routes>
        </div>
    </>
  )
}