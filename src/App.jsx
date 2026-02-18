import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Result from "./pages/Result";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/mission/:id" element={<Mission />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </BrowserRouter>
    );
}