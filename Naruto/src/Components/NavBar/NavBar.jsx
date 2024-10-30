import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar-container">
      <img
        src="https://archive.org/services/img/naruto-illustration-book"
        alt="imagen de naruto"
        className="logo-naruto-img"
      />
      <h1 className="navbar-title">API DE NARUTO</h1>
      <div className="navbar-buttons">
        <Link to={"/"}>
        <button className="navbar-button">Home</button>
        </Link>
        <Link to={"/favorites"}>
        <button className="navbar-button">Favoritos</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
