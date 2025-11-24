import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./UserContext";

export const ShopDataContext = createContext();
const ShopContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItem, setCartItem] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const currency = "₹";
  const delivery_fee = 40;

  const getProducts = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      console.log(result.data);
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

   const addtoCart = async (itemId, size) => {
    if (!size) {
      console.log("Select Product size");
      return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    console.log(cartData);

    if(userData) {
        try {
            let result = await axios.post(`${serverUrl}/api/cart/add`,
                {itemId, size},
                {withCredentials: true}
            )
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }
  };

  const getUserCart = async () => {
    try {
        const result = await axios.post(`${serverUrl}/api/cart/get`,
            {},
            {withCredentials:true}
        )
        setCartItem(result.data)
    } catch (error) {
        console.log(error)
    }
  }

  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItem)
    cartData[itemId][size] = quantity
    setCartItem(cartData)

    if(userData) {
        try {
            await axios.post(`${serverUrl}/api/cart/update`, 
                {itemId, size, quantity},
                {withCredentials: true}
            )

        } catch (error) {
            console.log(error)
        }
    }
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItem) {
        let itemInfo = products.find((product) => product._id === items)
        for(const item in cartItem[items]) {
            try {
                if(cartItem[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItem[items][item]
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return totalAmount;
  }

 
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(()=> {
    getUserCart()
  },[])

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    showSearch,
    setShowSearch,
    search,
    setSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount

  };
  return (
    <div>
      <ShopDataContext.Provider value={value}>
        {children}
      </ShopDataContext.Provider>
    </div>
  );
};

export default ShopContext;
