// Importa las funciones necesarias de Firebase Firestore
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/Firebase"; // Asegúrate de usar tu configuración de Firebase

const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Personaje"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
        console.log(items); // Aquí se muestra la información obtenida
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando datos...</div>;

  return (
    <div className="favorites-page">
    <h1 className="text-center">Mis Personajes Favoritos</h1>
    <div className="row">
      {data.length > 0 ? (
        data.map((item) => (
          <div className="col-md-4 mb-4" key={item}>
            <div className="card">
              <img src={item.images[0]} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title"> {item.name}</h5>
                <p className="card-text"> Fecha Nacimiento: {item.birthdate}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay personajes favoritos disponibles.</p>
      )}
    </div>
  </div>
  );
};

export default FavoritesPage;
