import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
function Slider() {
  const [sliders, setSliders] = useState([]);
  // Fetch sliders from the server
  const fetchSliders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/slider/slider");
      setSliders(response.data.sliders);
    } catch (error) {
      Swal.fire("Error", "Failed to fetch sliders", "error");
    }
  };
  useEffect(() => {
    fetchSliders();
  }, []);
  console.log(sliders);
  
  return (
    <Carousel>
      {sliders.map((slider, index) => (
        <Carousel.Item key={index}>
          <img
            src={`http://localhost:3000/uploads/${slider.sliderImage}`} // Ensure this path is correct
            alt={slider.slidername}
            style={{ width: "100%",height:"600px"}}
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default Slider;
