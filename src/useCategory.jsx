import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCategory = () => {
  const location = useSelector((state) => state.address.location);
  const initialStateLocation = { lat: 19.2234284, lng: 73.14427169999999 };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let lat = location?.lat || initialStateLocation.lat;
        let lng = location?.lng || initialStateLocation.lng;
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
        
        const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const proxyData = await response.json();
        const jsonData = proxyData.contents ? JSON.parse(proxyData.contents) : null;

        // Assuming data structure, adjust as per actual API response
        setCategories(jsonData?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [location]);

  return categories;
};

export default useCategory;





