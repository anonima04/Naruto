import Carousel from "../../Components/Carousel/Carousel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CharacterPage.css";
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../Firebase/Firebase'

const CharacterPage = () => {
  const { characterId } = useParams(); // obtengo el id con useParams
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://dattebayo-api.onrender.com/characters/${characterId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const imageUrls = data.images || [];
        setImages(imageUrls);
        setCharacter(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (characterId) {
      fetchCharacter();
    }
  }, [characterId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

   const handleFavorite = async()=>{
    const characterData = {
      images: character.images || [],
      birthdate: character.personal.birthdate,
      name:character.name
    }
    try{
      const refCharacter = collection(db, "Personaje");
      addDoc(refCharacter, characterData);
    }catch (error){
      console.error("Error al guardar el personaje en favoritos: ", error);
    }
   }

   return character ? (
    <div className="character-page-div">
      <h1 id="title-character-page">{character.name}</h1>
      <button className="favorite-button" onClick={handleFavorite}>
        <FontAwesomeIcon icon={faStar} /> Añadir a Favoritos
      </button>
  
      <Carousel images={images || []} id="carousel-character-page" />
  
      <div className="character-descripction">
        <div className="debut-characters">
          <h3>Debut</h3>
          <p><strong>Manga: </strong>{character.debut.manga}</p>
          <p><strong>Anime: </strong>{character.debut.anime}</p>
          <p><strong>Novel: </strong>{character.debut.novel}</p>
          <p><strong>Movie: </strong>{character.debut.movie}</p>
          <p><strong>Game: </strong>{character.debut.game}</p>
          <p><strong>Ova: </strong>{character.debut.ova}</p>
          <p><strong>AppersIn: </strong>{character.debut.appearsIn}</p>
        </div>
        {character.family ? (
        <div className="family-characters">
          <h3>Familia</h3>
          <p><strong>Papá: </strong>{character.family.father || "No disponible"}</p>
          <p><strong>Mamá: </strong>{character.family.mother || "No disponible"}</p>
          <p><strong>Hijo: </strong>{character.family.son || "No disponible"}</p>
          <p><strong>Hija: </strong>{character.family.daughter || "No disponible"}</p>
          <p><strong>Esposa: </strong>{character.family.wife || "No disponible"}</p>
          <p><strong>Hijo adoptivo: </strong>{character.family.adoptiveSon || "No tiene"}</p>
          <p><strong>Abuelo: </strong>{character.family.godfather || "No disponible"}</p>
        </div>
         ) : (
          <p>No se encontró información de la familia.</p>
        )}
  
        <div className="jutsu">
          <h3>Jutsu</h3>
          <p>{character.jutsu || "No disponible"}</p>
        </div>
  
        <div className="natureType">
          <h3>Tipo de naturaleza</h3>
          <p><strong>Nature type: </strong>{character.natureType || "No disponible"}</p>
        </div>
  
        <div className="personal">
          <h3>Información Personal</h3>
          <p><strong>Fecha de nacimiento: </strong>{character.personal.birthdate || "No disponible"}</p>
          <p><strong>Género: </strong>{character.personal.sex || "No disponible"}</p>
          <p><strong>Edad: </strong>{character.age || "No disponible"}</p>
          <p><strong>Altura: </strong>{character.height || "No disponible"}</p>
          <p><strong>Peso: </strong>{character.weight || "No disponible"}</p>
          <p><strong>Tipo de sangre: </strong>{character.personal.bloodType || "No disponible"}</p>
          <p><strong>Clasificación: </strong>{character.personal.classification || "No disponible"}</p>
          <p><strong>Cola de bestia: </strong>{character.personal.tailedBeast || "No disponible"}</p>
          <p><strong>Ocupación: </strong>{character.personal.occupation || "No disponible"}</p>
          <p><strong>Afiliación: </strong>{character.personal.affiliation || "No disponible"}</p>
          <p><strong>Equipo: </strong>{character.personal.team || "No disponible"}</p>
          <p><strong>Clan: </strong>{character.personal.clan || "No disponible"}</p>
          <p><strong>Títulos: </strong>{character.personal.titles || "No disponible"}</p>
          <p><strong>Herramientas: </strong>{character.tools || "No disponible"}</p>
          
          <div className="voiceAutors">
            <h3>Voz de actores</h3>
            <p><strong>Actor de voces en japonés: </strong>{character.voiceActors.japanese || "No disponible"}</p>
            <p><strong>Actor de voces en inglés: </strong>{character.voiceActors.english || "No disponible"}</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>No se encontró el personaje.</p>
  );
};

export default CharacterPage;