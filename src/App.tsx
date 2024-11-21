import "./App.css";
import "./tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";
import SummonerPage from "./pages/SummonerPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Summoner page with a dynamic parameter */}
        <Route path="/summoner/:summonerName" element={<SummonerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
