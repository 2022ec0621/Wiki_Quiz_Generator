import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
