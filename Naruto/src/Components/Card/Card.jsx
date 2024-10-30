import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Card(props, id, onClick) {
  const imageUrl =
    Array.isArray(props.images) && props.images.length > 0
      ? props.images[0]
      : "";

  return (
    <Link to={`/character/${id}`} style={{ textDecoration: "none" }}>
    <div  onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="card mb-3" style={{ maxWidth: "640px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={imageUrl}
              className="img-fluid rounded-start"
              alt={props.name}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p className="card-text">
                <h4>Jutsu</h4>
              <p>{props.natureType || "No disponible"}</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  natureType: PropTypes.arrayOf(PropTypes.string).isRequired,
};
