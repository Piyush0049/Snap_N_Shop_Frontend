import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallorders, updatestatus } from "../actions/orderactions";
import { getallusers } from "../actions/useractions";
import axios from "axios";
import { allproducts } from "../actions/productActions";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [x, setx] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const { orderdets } = useSelector((state) => state.allorders);
  const { work } = useSelector((state) => state.userdetails.user);
  const { user } = useSelector((state) => state.userdetails);
  const { allUsers } = useSelector((state) => state.AllUsers);
  const { allProducts } = useSelector((state) => state.products);

  const [opt, setopt] = useState("");
  const [selectedorder, setselectedorder] = useState(null); // single order object
  const [theproduct, settheproduct] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const [editimageurl, seteditimageurl] = useState("");
  const [newproduct, setnewproduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: {
      public_id: "public",
      url: "",
    },
  });

  useEffect(() => {
    const handleResize = () => setx(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (localStorage.getItem("width") !== null) {
      setx(parseInt(localStorage.getItem("width")));
    } else {
      setx(window.innerWidth);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data initially and on refresh after operations
  const fetchAllData = () => {
    dispatch(allproducts());
    dispatch(getallorders());
    dispatch(getallusers());
  };

  useEffect(() => {
    fetchAllData();
  }, [dispatch]);

  const handleSelectChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const update = async () => {
    if (!selectedorder) return;
    await dispatch(updatestatus(selectedorder._id, selectedStatus));
    setopt("orders");
    fetchAllData(); // Re-fetch after update
  };

  const changeroles = async (w, e) => {
    if (w === "admin") {
      if (!window.confirm("Are you sure you want to change the user's role to USER?"))
        return;
    }
    if (w === "user") {
      if (!window.confirm("Are you sure you want to change the user's role to ADMIN?"))
        return;
    }
    if (w === "admin") {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/auth/changerole`,
        { email: e, work: "user" },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(`The role of the user with email : ${e} has been changed to USER`);
    }
    if (w === "user") {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/auth/changerole`,
        { email: e, work: "admin" },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      toast.success(`The role of the user with email : ${e} has been changed to ADMIN`);
    }
    fetchAllData(); // Re-fetch after role change
  };

  const thepro = () => {
    if (theproduct && theproduct.length > 0) {
      setopt("theproduct");
      setEditedProduct(theproduct[0]);
      seteditimageurl(theproduct[0].images[0].url);
    }
  };

  const handleeditimage = (e) => {
    seteditimageurl(e.target.value);
  };

  const handleChange = (key, value) => {
    setEditedProduct((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const deleteprod = async (id) => {
    if (window.confirm("Are you sure want to delete the product?")) {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/prod/product/${id}`, {
        withCredentials: true,
      });
      toast.success("Product has been deleted successfully!");
      fetchAllData(); // Re-fetch after deletion
      setopt("products");
    }
  };

  const handleChangenewprod = (e) => {
    const { name, value } = e.target;
    setnewproduct({
      ...newproduct,
      [name]: value,
    });
  };

  const handleChangenewprodimage = (e) => {
    const updatedImages = { ...newproduct.images, url: e.target.value };
    setnewproduct({
      ...newproduct,
      images: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editedProduct) return;
    toast.success("Product has been updated successfully!");
    await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/prod/product/${editedProduct._id}`,
      {
        name: editedProduct.name,
        description: editedProduct.description,
        price: editedProduct.price,
        category: editedProduct.category,
        stock: editedProduct.stock,
        images: { public_id: "public", url: editimageurl },
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    setopt("products");
    settheproduct("");
    fetchAllData(); // Re-fetch after update
  };

  const handlecreatenewprod = async (e) => {
    if (window.confirm("Do you really want to create a new product?")) {
      e.preventDefault();
      try {
        await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/prod/product/create`,
          {
            name: newproduct.name,
            description: newproduct.description,
            price: newproduct.price,
            category: newproduct.category,
            stock: newproduct.stock,
            images: {
              public_id: newproduct.images.public_id,
              url: newproduct.images.url,
            },
          },
          { headers: { "Content-Type": "application/json" }, withCredentials: true }
        );
        setopt("products");
        fetchAllData(); // Re-fetch after create
      } catch (error) {
        console.error("Error creating new product:", error);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {work === "admin" ? (
        <div className="max-w-7xl mx-auto pb-5 pt-24 sm:p-24">
          <header className="mb-10">
            <nav>
              <ul className="flex justify-center space-x-12 text-lg font-mono text-gray-600">
                <li>
                  <button
                    className={`hover:text-gray-900 focus:text-gray-900 transition font-semibold ${
                      opt === "orders" ? "text-gray-900 underline" : ""
                    }`}
                    onClick={() => setopt("orders")}
                  >
                    Orders
                  </button>
                </li>
                <li>
                  <button
                    className={`hover:text-gray-900 focus:text-gray-900 transition font-semibold ${
                      opt === "products" ? "text-gray-900 underline" : ""
                    }`}
                    onClick={() => setopt("products")}
                  >
                    Products
                  </button>
                </li>
                <li>
                  <button
                    className={`hover:text-gray-900 focus:text-gray-900 transition font-semibold ${
                      opt === "customers" ? "text-gray-900 underline" : ""
                    }`}
                    onClick={() => setopt("customers")}
                  >
                    Users
                  </button>
                </li>
              </ul>
            </nav>
          </header>

          {/* Dashboard Content */}
          {opt === "" && (
            <div className="flex items-center justify-center h-[460px] bg-white rounded-xl shadow-sm">
              <h2 className={`font-bold text-center ${x > 536 ? "text-5xl" : "text-3xl"}`}>
                Welcome!
              </h2>
            </div>
          )}

          {/* Orders */}
          {opt === "orders" && orderdets.length > 0 && (
            <div className="space-y-6 max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg -sm">
              {orderdets.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-lg transition"
                  onClick={() => {
                    setselectedorder(orderdets.find((ord) => ord._id === order._id));
                    setopt("theorder");
                  }}
                >
                  <div>
                    <h3 className="font-semibold text-lg">User ID: {order.user}</h3>
                    <h4 className="text-sm text-gray-700 mb-1">Order ID: {order._id}</h4>
                    <p className="text-sm text-gray-600">Total: ₹{order.totalPrice}</p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="font-semibold">{order.orderStatus}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed On: <span className="font-medium">{order.createdAt.slice(0, 10)}</span>
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    {order.orderitems.map((item, i) => (
                      <img
                        key={i}
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md shadow-sm hidden sm:block"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Single Order */}
          {opt === "theorder" && selectedorder && (
            <div className="max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg space-y-8">
              <h2 className="text-2xl font-bold">Order Summary:</h2>
              <div className="flex justify-between font-semibold">
                <div>Placed On:</div>
                <div>{selectedorder.createdAt.slice(0, 10)}</div>
              </div>

              <div className="space-y-4">
                {selectedorder.orderitems.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-6 border rounded p-4 shadow-sm"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p>Price: ₹{product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Total: ₹{product.price * product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-10 justify-between">
                <div className="space-y-2 w-[320px]">
                  <h3 className="font-bold text-lg">Shipping Address:</h3>
                  <div className="flex justify-between font-semibold">
                    <span>Address:</span>
                    <span>{selectedorder.shippinginfo.address}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Country:</span>
                    <span>{selectedorder.shippinginfo.country}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>State:</span>
                    <span>{selectedorder.shippinginfo.state}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>City:</span>
                    <span>{selectedorder.shippinginfo.city}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Order Status:</span>
                    <span>{selectedorder.orderStatus}</span>
                  </div>
                </div>

                <div className="space-y-2 w-[320px]">
                  <h3 className="font-bold text-lg">Invoice Details:</h3>
                  <div className="flex justify-between font-semibold">
                    <span>Sub Total:</span>
                    <span>₹{selectedorder.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>GST (18%):</span>
                    <span>₹{selectedorder.taxPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Shipping Charges:</span>
                    <span>₹{selectedorder.shippingPrice}</span>
                  </div>
                  <hr className="border-t-2 border-gray-400 my-4" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total:</span>
                    <span>₹{selectedorder.totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-6">
                <select
                  value={selectedStatus}
                  onChange={handleSelectChange}
                  className="border border-gray-300 rounded-lg px-5 py-2 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button
                  onClick={update}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition-shadow shadow-sm"
                >
                  Update Status
                </button>
              </div>
            </div>
          )}

          {/* Products List */}
          {opt === "products" && (
            <div className="max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => setopt("createproduct")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-sm transition"
                >
                  Create New Product
                </button>
              </div>
              {allProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center space-x-6 p-2 sm:p-4 border rounded-lg shadow-sm"
                >
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-24 h-24 rounded object-cover hidden sm:block"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-700">ID: {product._id}</p>
                    <p className="text-gray-600 hidden sm:block">{product.description.substring(0, 100)}<b> ...</b></p>
                    <p className="text-gray-600">
                      Stock: <span className="font-semibold">{product.stock}</span>
                    </p>
                    <p className="text-gray-600">
                      Created/Updated By: <span className="font-semibold">{product.user}</span>
                    </p>
                    <p className="text-gray-600">
                      Created On: <span className="font-semibold">{product.createdAt.slice(0, 10)}</span>
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        settheproduct(allProducts.filter((prod) => prod._id === product._id));
                        thepro();
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white rounded px-2 sm:px-4 py-1 sm:py-2 font-semibold shadow-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteprod(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white rounded px-2 sm:px-4 py-1 sm:py-2 font-semibold shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Create Product */}
          {opt === "createproduct" && (
            <div className="max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-6">Create New Product:</h2>
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <label className="block font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newproduct.name}
                  onChange={handleChangenewprod}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newproduct.description}
                  onChange={handleChangenewprod}
                  className="w-full px-4 py-2 border rounded-lg min-h-[80px] focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={newproduct.price}
                  onChange={handleChangenewprod}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newproduct.category}
                  onChange={handleChangenewprod}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newproduct.stock}
                  onChange={handleChangenewprod}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  name="url"
                  value={newproduct.images.url}
                  onChange={handleChangenewprodimage}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Created/Updated By</label>
                <input
                  type="text"
                  value={user._id}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 text-gray-600 rounded-lg"
                />

                {newproduct.name &&
                  newproduct.description &&
                  newproduct.price &&
                  newproduct.category &&
                  newproduct.stock &&
                  newproduct.images.url && (
                    <button
                      type="submit"
                      onClick={handlecreatenewprod}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                    >
                      Create Product
                    </button>
                  )}
              </form>
            </div>
          )}

          {/* Edit Product */}
          {opt === "theproduct" && editedProduct && (
            <div className="max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-6">Edit Product Details:</h2>
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
                <img
                  src={editimageurl}
                  alt={editedProduct.name}
                  className={`w-full rounded mb-6 ${x > 603 ? "max-h-[600px]" : "max-h-[400px]"} object-contain`}
                />

                <label className="block font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Product ID</label>
                <input
                  type="text"
                  value={editedProduct._id}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 text-gray-600 rounded-lg"
                />

                <label className="block font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg min-h-[80px] focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editedProduct.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={editimageurl}
                  onChange={handleeditimage}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400"
                />

                <label className="block font-semibold text-gray-700">Created/Updated By</label>
                <input
                  type="text"
                  value={user._id}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 text-gray-600 rounded-lg"
                />

                <label className="block font-semibold text-gray-700">Created On</label>
                <input
                  type="text"
                  value={editedProduct.createdAt ? editedProduct.createdAt.slice(0, 10) : ""}
                  disabled
                  className="w-full px-4 py-2 border bg-gray-100 text-gray-600 rounded-lg"
                />

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                >
                  Update Details
                </button>
              </form>
            </div>
          )}

          {/* Users List */}
          {opt === "customers" && (
            <div className="max-h-[600px] overflow-y-auto bg-white p-6 rounded-lg shadow-sm">
              <ul className="space-y-4">
                {allUsers.map((user) => (
                  <li
                    key={user._id}
                    className="flex items-center justify-between p-2 sm:p-4  rounded bg-gray-50"
                  >
                    <div>
                      <h3 className="text-xl font-semibold mb-1">User: {user.username}</h3>
                      <p className="text-gray-700">
                        UserID: <span className="font-semibold">{user._id}</span>
                      </p>
                      <p className="text-gray-700">Email: {user.email}</p>
                      <p className="text-gray-700 font-semibold">Role: {user.work}</p>
                    </div>
                    <button
                      onClick={() => changeroles(user.work, user.email)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded transition"
                    >
                      Switch
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[1000px] w-full bg-gray-50">
          <h1
            className={`font-extrabold ${
              x > 873 ? "text-[120px]" : "text-6xl"
            } text-red-600`}
          >
            Access Denied!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
