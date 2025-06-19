import React, { useEffect, useState } from "react";
import "../styles/Home.css";

// Simulated API response
const mockData = {
  heading: "Explore the beauty of Journey",
  description:
    "Join our community of travel enthusiasts and discover new places, meet new people, and make lasting memories. Book with us and experience the world like never before.",
  images: [
    {
      src: "https://www.sciencesetavenir.fr/assets/img/2021/12/23/cover-r4x3w1200-61c45f4b25fea-049-f0342710.jpg",
      alt: "img1",
    },
    {
      src: "https://www.angsana.com/_next/image?url=https%3A%2F%2Fwww.angsana.com%2Fassets%2F2021-11%2Fdeluxe-in-ocean-villa-4.jpg&w=2048&q=75",
      alt: "img2",
    },
  ],
};

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    // Simulate data fetch
    const fetchData = () => {
      // mimic API delay
      setTimeout(() => {
        setContent(mockData);
      }, 500);
    };
    fetchData();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home">
      <div className="resp">
        <div id="imgSection">
          {content.images.map((img, index) => (
            <div className={`box${index + 1}`} key={index}>
              <img id="main" src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
        <div className="container">
          <div id="textSection">
            <h1 id="heading">{content.heading}</h1>
            <span id="span">{content.description}</span>
          </div>
          <button id="btn">
            <a href="#about">Learn More</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
