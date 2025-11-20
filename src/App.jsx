import './App.css'
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import HelpPage from "./HelpPage.jsx";
import HomePage from "./HomePage.jsx";
import AufgabenPage from "./AufgabenPage.jsx";

export default function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/home">HomePage</Link></li>
                    <li><Link to="/help">HelpPage</Link></li>
                    <li><Link to="/aufgaben">AufgabenPage</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/aufgaben" element={<AufgabenPage />} />
                <Route path="/help" element={<HelpPage />} />
            </Routes>
        </Router>
    );
}


