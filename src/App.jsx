import { useState } from 'react'
import './App.css'
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">HomePage</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/help">Help</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
            </Routes>
        </HashRouter>
    );
}

export default App;




