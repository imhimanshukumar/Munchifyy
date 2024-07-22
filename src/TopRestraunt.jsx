import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import RestrauntCard from "./RestrauntCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopRestraunt = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState({});
  const [slide, setSlide] = useState(0);
  const location = useSelector((state) => state.address.location);

  useEffect(() => {
    if (location) {
      fetchTopRestraunt(location);
    }
  }, [location]);

  const fetchTopRestraunt = async (location) => {
    try {
      let lat, lng;
      if (location.latitude && location.longitude) {
        lat = location.latitude;
        lng = location.longitude;
      } else if (location.lat && location.lng) {
        lat = location.lat;
        lng = location.lng;
      } else {
        throw new Error("Invalid location object structure");
      }

      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

      const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const proxyData = await response.json();
      const jsonData = proxyData.contents ? JSON.parse(proxyData.contents) : null;

      const restaurants =
        jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      const restinfo = jsonData?.data?.cards[1]?.card?.card;

      setData(restaurants || []);
      setTitle(restinfo || {});
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const nextSlide = () => {
    if (slide + 4 < data.length) {
      setSlide(slide + 4);
    }
  };

  const prevSlide = () => {
    if (slide - 4 >= 0) {
      setSlide(slide - 4);
    }
  };

  if (data.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between">
        <div className="text-[25px] font-bold my-5">
          {title?.header?.title || "Top Restaurants"}
        </div>
        <div className="flex">
          <div
            className={`cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 ${
              slide === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={prevSlide}
          >
            <FaArrowLeft />
          </div>
          <div
            className={`cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-[#e2e2e7] rounded-full mx-2 ${
              slide + 4 >= data.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={nextSlide}
          >
            <FaArrowRight />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data.slice(slide, slide + 4).map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestrauntCard resdata={restaurant} />
          </Link>
        ))}
      </div>
      <hr className="my-4 border-[2px]" />
    </div>
  );
};

export default TopRestraunt;











