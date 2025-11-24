import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";
import axios from "axios";
import { ShoppingBag, Package, AlertTriangle } from "lucide-react";

// Recharts
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [error, setError] = useState("");

  const { serverUrl } = useContext(AuthDataContext);

  const fetchCounts = async () => {
    try {
      const productRes = await axios.get(
        `${serverUrl}/api/product/list`,
        { withCredentials: true }
      );

      const orderRes = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      );

      setTotalProducts(productRes.data.length);
      setTotalOrders(orderRes.data.length);

    } catch (err) {
      console.error("Fetching error:", err);
      setError("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // 📊 Sample chart data (replace with real backend data later)
  const chartData = [
    { month: "Jan", orders: 10, products: 5 },
    { month: "Feb", orders: 14, products: 7 },
    { month: "Mar", orders: 20, products: 12 },
    { month: "Apr", orders: 16, products: 10 },
    { month: "May", orders: 25, products: 14 },
  ];

  return (
    <div className="bg-[#F3F4F6] min-h-screen">
      <Nav />

      <div className="flex">
        <Sidebar />

        <div className="p-8 w-full">
          <h2 className="text-4xl font-semibold mb-8 text-zinc-800">
            ShopMotto Admin Dashboard
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
              <AlertTriangle size={22} /> {error}
            </div>
          )}

          {/* ---------------- STAT CARDS ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

            <div className="bg-white shadow-md rounded-xl p-8 flex items-center justify-between border">
              <div>
                <h3 className="text-xl font-semibold text-zinc-700">
                  Total Products
                </h3>
                <p className="text-4xl font-bold mt-2">
                  {totalProducts === null ? "Loading..." : totalProducts}
                </p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-white">
                <Package size={40} />
              </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-8 flex items-center justify-between border">
              <div>
                <h3 className="text-xl font-semibold text-zinc-700">
                  Total Orders
                </h3>
                <p className="text-4xl font-bold mt-2">
                  {totalOrders === null ? "Loading..." : totalOrders}
                </p>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl text-white">
                <ShoppingBag size={40} />
              </div>
            </div>

          </div>

          {/* ---------------- CHARTS ---------------- */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* Orders Line Chart */}
            <div className="bg-white p-6 shadow-md rounded-xl border">
              <h3 className="text-xl font-semibold mb-4 text-zinc-700">Orders Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <Line type="monotone" dataKey="orders" stroke="#111" strokeWidth={3} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Bar Chart */}
            <div className="bg-white p-6 shadow-md rounded-xl border">
              <h3 className="text-xl font-semibold mb-4 text-zinc-700">Product Growth</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="products" stroke="#111" fill="#333" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
