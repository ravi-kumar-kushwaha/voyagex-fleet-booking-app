import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import banner3 from "../assets/banner3.jpeg";
import banner4 from "../assets/banner4.jpeg";
const Hero = () => {

const images = [
  {
    url: banner1,
    title: 'Welcome to VoyageX',
    subtitle: 'Reliable logistics booking made easy. Instantly search and reserve a wide range of vehicles tailored to your cargo, route, and schedule. Whether you need a quick city delivery or long-haul transport, VoyageX ensures trusted drivers, transparent pricing, and real-time availability to move your business forward.',
  },  
  {
    url: banner2,
    title: 'Fast & Reliable Logistics Across India',
    subtitle: 'Book trucks, vans, and cargo vehicles instantly with real-time availability and trusted service for all routes.',
  },
  {
    url: banner3,
    title: 'A Fleet That Delivers Every Time',
    subtitle: 'From first-mile pickup to last-mile delivery, manage your logistics with precision and peace of mind.',
  },
  {
    url: banner4,
    title: 'Wide Range of Vehicles For Every Business Need',
    subtitle: 'Search by capacity, route, and timing — and book vehicles optimized for your cargo and timeline.',
  },
];


return (
  <div className="relative w-full h-[500px]">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
      className="w-full h-full"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="w-full h-full  bg-center  relative flex items-center justify-center"
            style={{ backgroundImage: `url(${img.url})`, backgroundSize: "cover" }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="z-10 text-center w-[70%] px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">{img.title}</h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6">{img.subtitle}</p>
              <button className="btn btn-primary px-6 py-2 rounded-full">Get Started</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);


};

export default Hero;
