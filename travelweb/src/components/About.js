import React from "react";
import "../styles/About.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { CiPercent } from "react-icons/ci";

const About = () => {
  return (
    <div id='about'>
      <div id='text'>
        <h1 className='main-heading'>We offer the Best</h1>
        <div className='desc'>
          <h2>
            Our team of travel experts is dedicated to ensuring that you have
            the vacation of a lifetime. Choose us for your next adventure and
            see why we are best in the business.
          </h2>
        </div>
      </div>

      <div className='aboutContainer'>
        <div className='about-box'>
          <div className='icon'>
            <GiCommercialAirplane />
          </div>
          <h2 className='card-heading'>International Tours</h2>
          <p>
            Explore the world like never before with our international tours.
            Discover new cultures, meet new people, and create memories that will
            last a lifetime.
          </p>
        </div>

        <div className='about-box'>
          <div className='icon'>
            <BsFillPeopleFill />
          </div>
          <h2 className='card-heading'>Travel Community</h2>
          <p>
            Join our travel community and connect with like-minded travelers from
            around the world. Share tips, stories, and advice on your next
            adventure.
          </p>
        </div>

        <div className='about-box'>
          <div className='icon'>
            <CiPercent />
          </div>
          <h2 className='card-heading'>Great Offers</h2>
          <p>
            Don’t miss out on our exclusive discounts and deals on flights, hotels,
            and vacation packages. Save big and travel more with our special offers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
