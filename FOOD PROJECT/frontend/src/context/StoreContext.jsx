import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets"; 
export const StoreContext = createContext(null);

const StoreProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const url = "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
      if(!cartItems[itemId]){
        setCartItems((prev) =>({...prev,[itemId]:1}))
      }
      else{
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]+1}))
      }
      if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
    }
              
    const removeFromCart = async (itemId) => {
        setCartItems((prev) =>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
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


      const fetchFoodList = async () => {
        const response =await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
      }


      const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
        console.log("cartitems"+cartItems)
      }

      // to check cart items  
      useEffect(() =>{
        async function loadData(){
          await fetchFoodList();
          if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
          }
        }
        loadData();
      },[])

        
    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
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
