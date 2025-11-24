import React, { useContext, useEffect, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Title from "../components/Title";


const Order = () => {
  let [orderData, setOrderData] = useState([]);
  let { currency } = useContext(ShopDataContext);
  let { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/userorder`,
        {},
        { withCredentials: true }
      );
      if (result.data) {
        let allOrderItem = [];
        result.data.map(order => {
          order.items.map(item => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [serverUrl]);

  return (
    <div className="bg-[#E8E8E8] p-5 overflow-y-scroll h-[100vh] md:h-[80vh]">
      <div>
        <Title text1={"MY"} text2={"ORDER"} />
      </div>
      <div className="">
        {orderData.map((item) => (
          <div key={item._id} className="flex justify-center p-3 ">
            <div className="bg-[#9F9FA9] p-2 w-[90%] flex flex-wrap items-center gap-5 rounded-md shadow-md shadow-[black] relative">
              <img
                src={item.image1}
                className="w-[120px] h-[120px] rounded"
                alt=""
              />
              <div>
                <h3 className="font-medium text-xl">{item.name}</h3>
              <div className="w-[200px] flex gap-4 items-center">
                <p>
                  price <span className="font-medium">{currency}{item.price}</span>
                </p>
                <p className="text-center">Quantity <span className="font-medium">{item.quantity}</span></p>
                <p className="text-center">
                  Size <span className="font-medium">{item.size}</span>
                </p>
              </div>
              <div>
                Date: {new Date(item.date).toDateString()}
              </div>
              <div>
                PaymentMethod: {item.paymentMethod}
              </div>
              </div>
              
              <div className="flex items-center gap-2 absolute md:right-[50%] md:top-[45%] right-2 top-1">
                <p className="w-[10px] h-[10px]  rounded-full bg-green-800"></p>
                {item.status}
              </div>

              <div className="">
                <button onClick={loadOrderData} className="px-3 py-2 bg-zinc-700 text-white rounded absolute md:right-5 right-2 top-[25%] md:top-[40%] active:bg-zinc-500 cursor-pointer">Track Order</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
