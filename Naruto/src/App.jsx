import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Page/HomePage/HomePage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import CharacterPage from "./Page/CharacterPage/CharacterPage";
import FavoritesPage from "./Page/FavoritesPage/FavoritesPage";
// import Carousel from './Components/Carousel/Carousel'
import CharacterPage from "./Page/CharacterPage/CharacterPage";

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/filter" element={<FilterPage />} /> */}
        {/* <Route path="/characters" element={<CardUser />} /> */}
        <Route path="/character/:characterId" element={<CharacterPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
