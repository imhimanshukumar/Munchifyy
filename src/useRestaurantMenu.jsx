import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useRestaurantMenu = (resId) => {
  const location = useSelector((state) => state.address.location);
  const [menuInfo, setMenuInfo] = useState(null);

  useEffect(() => {
    const fetchInitialMenu = async () => {
      if (location && location.latitude && location.longitude) {
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${location.latitude}&lng=${location.longitude}&restaurantId=${resId}`;
        
        try {
          const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const proxyData = await response.json();
          const jsonData = proxyData.contents ? JSON.parse(proxyData.contents) : null;
          setMenuInfo(jsonData.data);
        } catch (error) {
          console.error("Error fetching menu:", error);
          setMenuInfo(null);
        }
      }
    };

    fetchInitialMenu();

  }, [location, resId]);

  return menuInfo;
};

export default useRestaurantMenu;









// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const useRestaurantMenu = (resId) => {
//   const location = useSelector((state) => state.address.location);
//   const [menuInfo, setMenuInfo] = useState(null);

//   useEffect(() => {
//     const fetchInitialMenu = async () => {
//       if (location && location.latitude && location.longitude) {
//         try {
//           const response = await fetch(
//             `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${location.latitude}&lng=${location.longitude}&restaurantId=${resId}`
//           );
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           const json = await response.json();
//           setMenuInfo(json.data);
//         } catch (error) {
//           console.error("Error fetching menu:", error);
//           setMenuInfo(null);
//         }
//       }
//     };

//     fetchInitialMenu();

//   }, [location, resId]);

//   return menuInfo;
// };

// export default useRestaurantMenu;














// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// const useRestaurantMenu = (resId) => {
//   const location = useSelector((state) => state.address.location);
//   const [menuInfo, setMenuInfo] = useState(null);

//   useEffect(() => {
//     if (location && location.lat && location.lng) {
//       fetchMenu(location.lat, location.lng);
//     }
//   }, [location, resId]);

//   const fetchMenu = async (lat, lng) => {
//     try {
//       const response = await fetch(
//         `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`
//       );
//       const json = await response.json();
//       setMenuInfo(json.data);
//     } catch (error) {
//       console.error("Error fetching menu:", error);
//       setMenuInfo(null);
//     }
//   };

//   return menuInfo;
// };

// export default useRestaurantMenu;
