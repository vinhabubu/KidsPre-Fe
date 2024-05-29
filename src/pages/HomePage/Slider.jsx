import slider1 from "assets/images/slider1.jpg";
import slider2 from "assets/images/slider2.jpg";
import slider3 from "assets/images/slider3.jpg";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
const list = [
  {
    image: slider1,
    title: "The best school",
    subtitle: "for your kids",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Accusantium fugit id cum ad? Consectetur praesentium dolorem
    totam tenetur. Minus, doloremque?`,
  },
  {
    image: slider2,
    title: "The best school",
    subtitle: "for your kids",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Accusantium fugit id cum ad? Consectetur praesentium dolorem
    totam tenetur. Minus, doloremque?`,
  },
  {
    image: slider3,
    title: "The best school",
    subtitle: "for your kids",
    desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Accusantium fugit id cum ad? Consectetur praesentium dolorem
    totam tenetur. Minus, doloremque?`,
    position: "caption-left",
    color: "text-white",
  },
];

function Slider() {
  const [activeIndex, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <section>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
        {list.map((item, index) => (
          <Carousel.Item key={index}>
            <img
              src={item.image}
              className="d-block w-100"
              alt="images slider"
            />
            <div className={`caption ${item?.position}`}>
              <div className="box-caption mx-auto">
                <h3 className="title text-info">{item.title}</h3>
                <h3 className=" text-danger sub-title fw-bold">
                  {item.subtitle}
                </h3>
                <p className={`desc text-secondary ${item?.color}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}

export default Slider;
