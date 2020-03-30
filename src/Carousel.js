import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       photos: [],
  //       active: 0,
  //     };

  //     this.handleIndexClick = this.handleIndexClick.bind(this);
  //   }
  // react method, must be static, take a set of props and return a new state
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    // if (media.length) {
    //   // only get large photos
    //   photos = media.map(({ large }) => large);
    // }
    return { photos };
  }

  handleIndexClick = (event) => {
    this.setState({
      // convert this string into a number
      active: +event.target.dataset.index,
    });
  };
  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
