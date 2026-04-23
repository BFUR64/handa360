import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}