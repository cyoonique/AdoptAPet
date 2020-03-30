import React from "react";
import pet from "@frontendmasters/pet";

// class component - can not use hooks with class
class Details extends React.Component {
  constructor(props) {
    // call the constructor on my parent class which React.Component
    super(props);
    this.state = {
      loading: true,
    };
  }
  //life cicle method runs first up, good for Ajax request
  //once loads, goto the API to get the pet information
  componentDidMount() {
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
      });
  }
  render() {}
}
// const Details = (props) => {
//     // preformatted
//   return (
//     <pre>
//       <code>{JSON.stringify(props, null, 4)}</code>
//     </pre>
//   );
// };

export default Details;
