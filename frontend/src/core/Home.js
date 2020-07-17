import React, { useState, Component } from "react";
import Layout from "./Layout";
import slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const photos = [
  {
    name: "photo1",
    url:'https://images.unsplash.com/photo-1594795576050-76e7077f1685?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: "photo2",
    url:'https://images.unsplash.com/photo-1594800277934-8bf755112e0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: "photo3",
    url:'https://images.unsplash.com/photo-1594899756066-46964fff3add?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
  },
];
class Home extends Component {
  state = {};
  render() {
      const settings={
          dots: true,
          fade: true,
          infinte: true,
          speed: 500,
          slideToShow: 1,
          arrow: true,
          slidesToScroll: 1,
          className: "slides"
      }
    return (
      <div className="App">
        <Layout title="AndSold" description="Sell your used product">
            <slider {...settings}>
            {photos.map((photo) => {
                return(
                    <div>
                        <img width="100%" src={photo.url}/>
                    </div>
                )
            })}
            </slider>
        </Layout>
      </div>
    );
  }
}

// export default App;

export default Home;
