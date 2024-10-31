import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "../Card/Card";
import "./CardUser.css";

const CardUser = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCharacters = async () => {
    try {
      const response = await fetch("https://dattebayo-api.onrender.com/characters");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.characters || []);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCartClick = (id) => {
    navigate(`/character/${id}`); // Selecciona el personaje con el ID correspondiente
  };

  return (
    <div className="div-carduser-content custom-bg">
      <div id="data">
        {characters.length > 0 ? (
          characters.map((character) => (
            <div className="card" key={character.id} onClick={() => handleCartClick(character.id)}>
              <Cart
                name={character.name} 
                images={character.images}
                natureType={character.natureType}
              />
            </div>
          ))
        ) : (
          <p>No hay personajes disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CardUser;
