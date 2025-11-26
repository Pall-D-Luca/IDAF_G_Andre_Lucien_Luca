import { useState } from 'react';
import './App.css'
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import HelpPage from "./HelpPage.jsx";
import HomePage from "./home/HomePage.jsx";
import AufgabenPage from "./aufgaben/AufgabenPage.jsx";

export default function App() {
    const [unlockedStep, setUnlockedStep] = useState(1);

    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/home">HomePage</Link></li>
                    <li><Link to="/help">HelpPage</Link></li>
                    {/*<li><Link to="/aufgaben">AufgabenPage</Link></li>*/}

                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} />} />
                <Route path="/home" element={<HomePage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} />} />
                <Route path="/aufgaben" element={<AufgabenPage unlockedStep={unlockedStep} setUnlockedStep={setUnlockedStep} />} />
                <Route path="/help" element={<HelpPage />} />
            </Routes>
        </Router>
    );
}


