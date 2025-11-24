import React, { useContext } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import upload from "../assets/upload.jpg";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [categ, setCateg] = useState("Men");
  const [subCateg, setSubCateg] = useState("Top-wear");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  let { serverUrl } = useContext(AuthDataContext);
  let [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", desc);
      formData.append("category", categ);
      formData.append("subCategory", subCateg);
      formData.append("price", price);
      formData.append("bestseller", bestSeller);
      formData.append("sizes", JSON.stringify(size));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      const result = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      toast.success("Add Product Successfully!");
      if (result.data) {
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDesc("");
        setPrice("");
        setBestSeller(false);
        setCateg("Men");
        setSubCateg("Top-wear");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add Product failed!");
    }
  };
  return (
    <div className="bg-[#E8E8E8]">
      <Nav />
      <div className="flex">
        <Sidebar />

        <form className="w-full p-5" onSubmit={handleAddProduct}>
          <h1 className="text-4xl font-semibold">Add Product</h1>
          <div className="mt-2">
            <h2 className="text-xl font-medium text-[#808080dc]">
              Upload Imaages
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <label
                htmlFor="image1"
                className="cursor-pointer mt-2 hover:mt-0 hover:shadow-lg shadow-zinc-500"
              >
                <img
                  src={!image1 ? upload : URL.createObjectURL(image1)}
                  alt=""
                  className="w-[100px] h-[100px] rounded "
                />
                <input
                  type="file"
                  id="image1"
                  hidden
                  onChange={(e) => setImage1(e.target.files[0])}
                />
              </label>
              <label
                htmlFor="image2"
                className="mt-2 cursor-pointer hover:mt-0 hover:shadow-lg shadow-zinc-500"
              >
                <img
                  src={!image2 ? upload : URL.createObjectURL(image2)}
                  alt=""
                  className="w-[100px] h-[100px] rounded"
                />
                <input
                  type="file"
                  id="image2"
                  hidden
                  onChange={(e) => setImage2(e.target.files[0])}
                />
              </label>
              <label
                htmlFor="image3"
                className="mt-2 cursor-pointer hover:mt-0 hover:shadow-lg shadow-zinc-500"
              >
                <img
                  src={!image3 ? upload : URL.createObjectURL(image3)}
                  alt=""
                  className="w-[100px] h-[100px] rounded"
                />
                <input
                  type="file"
                  id="image3"
                  hidden
                  onChange={(e) => setImage3(e.target.files[0])}
                />
              </label>
              <label
                htmlFor="image4"
                className="mt-2 cursor-pointer hover:mt-0 hover:shadow-lg shadow-zinc-500"
              >
                <img
                  src={!image4 ? upload : URL.createObjectURL(image4)}
                  alt=""
                  className="w-[100px] h-[100px] rounded"
                />
                <input
                  type="file"
                  id="image4"
                  hidden
                  onChange={(e) => setImage4(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-7">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl">Product Name</h3>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="type here"
                className="border border-[#808080dc] p-2 rounded md:w-[40%] w-[320px]"
              />
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl">Product Description</h3>
              <textarea
                name="Description"
                id="Description"
                onChange={(e) => setDesc(e.target.value)}
                value={desc}
                placeholder="type here"
                className="border border-[#808080dc] p-2 rounded md:w-[40%]"
              ></textarea>
            </div>

            <div className="flex flex-wrap items-center gap-5 md:gap-12">
              <div className="flex flex-col gap-5">
                <h3 className="text-xl">Product Category</h3>
                <select
                  name=""
                  id=""
                  className="border border-[#808080dc] p-2 rounded "
                  onChange={(e) => setCateg(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="flex flex-col gap-5">
                <h3 className="text-xl">Sub-Category</h3>
                <select
                  name=""
                  id=""
                  className="border border-[#808080dc] p-2 rounded"
                  onChange={(e) => setSubCateg(e.target.value)}
                >
                  <option value="Top-wear">Top-wear</option>
                  <option value="Bottom-wear">Bottom-wear</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl">Product Price</h3>
              <input
                type="number"
                placeholder="₹ 20000"
                className="border border-[#808080dc] p-2 rounded md:w-[40%]"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl ">Product Size</h3>
              <div className="flex flex-wrap items-center gap-5">
                <div
                  className={`flex items-center justify-center border w-[80px] p-3 font-bold rounded cursor-pointer ${
                    size.includes("S") ? "bg-zinc-700 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes("S")
                        ? prev.filter((item) => item !== "S")
                        : [...prev, "S"]
                    )
                  }
                >
                  S
                </div>
                <div
                  className={`flex items-center justify-center border w-[80px] p-3 font-bold rounded cursor-pointer ${
                    size.includes("M") ? "bg-zinc-700 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes("M")
                        ? prev.filter((item) => item !== "M")
                        : [...prev, "M"]
                    )
                  }
                >
                  M
                </div>
                <div
                  className={`flex items-center justify-center border w-[80px] p-3 font-bold rounded cursor-pointer ${
                    size.includes("L") ? "bg-zinc-700 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes("L")
                        ? prev.filter((item) => item !== "L")
                        : [...prev, "L"]
                    )
                  }
                >
                  L
                </div>
                <div
                  className={`flex items-center justify-center border w-[80px] p-3 font-bold rounded cursor-pointer ${
                    size.includes("XL") ? "bg-zinc-700 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes("XL")
                        ? prev.filter((item) => item !== "XL")
                        : [...prev, "XL"]
                    )
                  }
                >
                  XL
                </div>
                <div
                  className={`flex items-center justify-center border w-[80px] p-3 font-bold rounded cursor-pointer ${
                    size.includes("XXL") ? "bg-zinc-700 text-white" : ""
                  }`}
                  onClick={() =>
                    setSize((prev) =>
                      prev.includes("XXL")
                        ? prev.filter((item) => item !== "XXL")
                        : [...prev, "XXL"]
                    )
                  }
                >
                  XXL
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4 mb-7">
            <input
              type="checkbox"
              id="checkbox"
              className="w-[20px] h-[20px]"
              onChange={() => setBestSeller((prev) => !prev)}
              checked={bestSeller}
            />
            <label htmlFor="checkbox">
              <h3 className="text-xl">Add to BestSeller</h3>
            </label>
          </div>

          <button className="px-8 py-2 cursor-pointer bg-zinc-700 text-white font-medium rounded-lg hover:bg-zinc-900">
            {loading ? <Loader /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
