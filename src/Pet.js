import React from "react";
import { Link } from "@reach/router";

export default function Pet({ name, animal, breed, media, location, id }) {
  // default image for animals without images
  // let hero = "http://placecorgi.com/300/300";
  // if image exist replace default animalImg
  // if (media.length) {
  //   hero = media[0].small;
  // }
  let photos = [];
  if (media && media.photos && media.photos.photo) {
    photos = media.photos.photo.filter((photo) => photo["@size"] === "pn");
  }
  const hero = photos[0] ? photos[0].value : "http://placecorgi.com/600/600";
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
}
