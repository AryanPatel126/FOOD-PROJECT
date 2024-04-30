import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets"; 
export const StoreContext = createContext(null);

const StoreProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (itemId) => {
      if(!cartItems[itemId]){
        setCartItems((prev) =>({...prev,[itemId]:1}))
      }
      else{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
      }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
      }

      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
          if(cartItems[item]>0) {
            let itemInfo = food_list.find((product)=>product._id === item)
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
        return totalAmount;
      }

      // to check cart items  
      useEffect(() =>{
        console.log(cartItems)
      },[cartItems])

        
    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount
  };

    
    return (
      <StoreContext.Provider value={contextValue}>
          {props.children}
      </StoreContext.Provider>
    );
  }

  export default StoreProvider 




  // to store data in localstorage

// import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";

// export const StoreContext = createContext(null);

// const StoreProvider = (props) => {
//   const [cartItems, setCartItems] = useState(() => {
//     // Load cart items from localStorage if available, otherwise set to empty array
//     const storedCartItems = localStorage.getItem("cartItems");
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const addToCart = (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         let itemInfo = food_list.find((product) => product._id === item);
//         totalAmount += itemInfo.price * cartItems[item];
//       }
//     }
//     return totalAmount;
//   };

//   // Store cart items in localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Log cart items for debugging
//   useEffect(() => {
//     console.log(cartItems);
//   }, [cartItems]);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreProvider;
