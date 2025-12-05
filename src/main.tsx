import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ServicePage from './pages/services/ServicePage.tsx';
import SolutionPage from './pages/solutions/SolutionPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/services/:serviceId" element={<ServicePage />} />
                <Route path="/solutions/:solutionId" element={<SolutionPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
