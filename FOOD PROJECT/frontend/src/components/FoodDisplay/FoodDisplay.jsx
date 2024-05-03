import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (food_list.length > 0) {
        setIsLoading(false);
      }
    }, [food_list]);
    console.log(food_list)
    return (
        <div className='food-display' id='food-display'>
          <h2>Top dishes near you</h2>
          <div className="food-display-list">
            {isLoading? (
              <div>Loading food items...</div>// display loader while data is loading
            ) : (
              food_list.map((item, index) => {
                if (category === "All" || category === item.category) {
                  return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} category={item.category} />;
                }
                return null;
              })
            )}
          </div>
        </div>
      );
    };

export default FoodDisplay
