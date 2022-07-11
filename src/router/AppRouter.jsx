import { Route,Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { DcPage } from '../heroes/pages/DcPage';
import { MarvelPage } from '../heroes/pages/MarvelPage';
import { Navbar } from '../ui';

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="marvel" element={<MarvelPage />} />
                <Route path="dc" element={<DcPage />} />
                
                <Route path="Login" element={<LoginPage />} />

                <Route path="/" element={<Navigate to='/marvel' />} />
            </Routes>
        </>
    )
}