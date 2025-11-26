import { useState, useEffect } from 'react';
import './App.css'
import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import HelpPage from "./HelpPage.jsx";
import HomePage from "./home/HomePage.jsx";
import AufgabenPage from "./aufgaben/AufgabenPage.jsx";

const MOBILE_BREAKPOINT = 768; // Define a breakpoint

export default function App() {
    const [unlockedStep, setUnlockedStep] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT); // Initial check

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Router>
            <header className="app-header">
                <nav className="nav app-container">
                    <div className="nav__logo">
                        <NavLink to="/">Bundesrat-Crashkurs</NavLink>
                    </div>
                    <ul className="nav__list">
                        <li><NavLink to="/home" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>Home</NavLink></li>
                        <li><NavLink to="/aufgaben" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>Aufgaben</NavLink></li>
                        <li><NavLink to="/help" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>Hilfe</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main className="app-main">
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<HomePage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} isMobile={isMobile} />} />
                        <Route path="/home" element={<HomePage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} isMobile={isMobile} />} />
                        <Route path="/aufgaben" element={<AufgabenPage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} isMobile={isMobile} />} />
                        <Route path="/help" element={<HelpPage />} />
                    </Routes>
                </div>
            </main>
        </Router>
    );
}