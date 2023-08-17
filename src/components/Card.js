import "./Card.css";
function Card({ title, image, description, url }) {
  const defaultImage =
    "https://i.pinimg.com/originals/d1/d9/ae/d1d9aec6e351baa115000b4b75e02b1b.jpg";
  return (
    <div className="card">
      <h2>{title}</h2>
      <img
        src={image ?? defaultImage}
        onError={(e) => (e.target.src = defaultImage)}
        alt="evenement"
      />
      {/* <img src={image ? image : defaultImage} onError={(e) => (e.target.src = defaultImage)} /> */}
      <div className="card-desc">
        <p>{description}</p>
        <a href={url}>Voir l'évènement</a>
      </div>
    </div>
  );
}

export default Card;
