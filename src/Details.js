import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

// class component - can not use hooks with class
class Details extends React.Component {
  state = { loading: true };
  //   constructor(props) {
  //     // call the constructor on my parent class which React.Component
  //     super(props);
  //     this.state = {
  //       loading: true,
  //     };
  //   }
  //life cicle method runs first up, good for Ajax request
  //once loads, goto the API to get the pet information
  componentDidMount() {
    // throw new Error("lol");
    pet
      .animal(this.props.id)
      // get back animal from API
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      }, console.error);
  }
  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }
    // pull all these out of this.state
    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
