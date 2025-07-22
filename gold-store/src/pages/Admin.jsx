import React, { useState, useEffect, useRef } from "react";
import { axiosInstance } from '../../axios';
import { Trash2 } from "lucide-react";

// Constants
const CATEGORY_OPTIONS = [
  { label: "Ring", value: "ring" },
  { label: "Necklace", value: "necklace" },
  { label: "Bracelet", value: "bracelet" },
  { label: "Earring", value: "earring" },
  { label: "Pendant", value: "pendant" },
  { label: "Chain", value: "chain" },
  { label: "Payal", value: "payal" },
  { label: "Bangle", value: "bangle" },
];

// Modal component for delete confirmation & item detail view
function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-xl max-w-sm w-full p-6 shadow-lg animated-fade-in">
        <button
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-stone-100 transition"
          onClick={onClose}
        >
          <Trash2 className="w-4 h-4 text-stone-600" />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-stone-800">Confirm Delete</h3>
        <p className="mb-4 text-stone-600">Are you sure you want to delete <strong>{item.name}</strong>?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-stone-200 rounded hover:bg-stone-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={() => onConfirm(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [item, setItem] = useState({ name: "", category: "ring", price: "", rating: "", description: "" });
  const [jewel, setJewel] = useState([]);
  const [message, setMessage] = useState({}); // { message: "", color: "" }
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [queries, setQueries] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchJewel();
    fetchQueries();
  }, []);

  const fetchJewel = async () => {
    try {
      const response = await axiosInstance.get("api/user/jewel");
      if (response.data.success) {
        setJewel(response.data.goldItem);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchQueries = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/queries", { withCredentials: true });
      if (res.data.success) setQueries(res.data.queries);
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage({ color: "bg-yellow-400", message: "Please upload an image." });
      return;
    }
    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("price", item.price);
    formData.append("rating", item.rating);
    formData.append("description", item.description);
    formData.append("image", imageFile);
    try {
      await axiosInstance.post("/api/admin/newItem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setMessage({ color: "bg-green-400", message: "Item added successfully!" });
      window.location.reload();
    } catch (err) {
      setMessage({ color: "bg-red-400", message: "Error submitting item." });
    }
  };

  const handleDelete = (id) => {
    setSelectedDeleteItem(jewel.find(j => j.id === id));
    setDeleteModalOpen(true);
  };
  const confirmDelete = async (id) => {
    try {
      await axiosInstance.delete("/api/admin/deleteItem", { data: { id }, withCredentials: true });
      setJewel(prev => prev.filter(j => j.id !== id));
      setMessage({ color: "bg-green-400", message: "Item deleted successfully." });
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage({ color: "bg-red-400", message: "Failed to delete item." });
    }
    setDeleteModalOpen(false);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDeleteItem(null);
  };

  // for product-details modal
  const handleItemDetails = (product) => {
    setDetailItem(product);
    setDetailModalOpen(true);
  };
  const closeDetails = () => {
    setDetailModalOpen(false);
    setDetailItem(null);
  };

  // Auto dismiss message
  useEffect(() => {
    if (message.message) {
      const timer = setTimeout(() => setMessage({}), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 font-serif">
      {/* Message Toast */}
      {message.message && (
        <div
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${message.color} text-white px-6 py-3 rounded-md shadow-md z-50 transition-all duration-300`}
        >
          {message.message}
        </div>
      )}

      {/* Add New Item Form */}
      <section className="bg-white rounded-lg shadow-lg p-8 border border-stone-200 space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-stone-800">Add New Gold Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={item.name}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <select
            name="category"
            value={item.category}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={item.rating}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            rows={4}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          {preview && (
            <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded border mx-auto mt-4" />
          )}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md mt-4 transition"
          >
            Add Item
          </button>
        </form>
      </section>

      {/* List of Items with delete & details */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Gold Items</h2>
        {jewel.length === 0 ? (
          <p className="text-gray-500">No items found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jewel.map((j) => (
              <div
                key={j.id}
                className="bg-white border-stone-200 rounded-lg shadow-md p-4 relative hover:shadow-xl transition cursor-pointer"
                onClick={() => handleItemDetails(j)}
              >
                <img
                  src={`http://localhost:3000/uploads/${j.image}`}
                  alt={j.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-stone-700">{j.name}</h3>
                <p className="text-sm text-stone-500 mb-1">Category: {j.category}</p>
                <p className="text-sm text-stone-500 mb-1">₹{j.price}</p>
                <p className="text-sm text-stone-500 mb-1">Rating: {j.rating}⭐</p>
                <p className="text-sm text-stone-600">{j.description}</p>
                {/* Delete button, top right */}
                <button
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-stone-100 transition"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(j.id);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Queries list */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">User Queries</h2>
        {queries.length === 0 ? (
          <p className="text-gray-500">No queries found.</p>
        ) : (
          <ul className="space-y-4">
            {queries.map((q) => (
              <li
                key={q.id}
                className="border border-stone-200 rounded-lg p-4 flex justify-between items-start gap-4 hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold">{q.name}</p>
                  <p className="text-sm text-stone-500">{q.email}</p>
                  <p className="mt-1 text-stone-800">{q.query}</p>
                </div>
                <button
                  className="flex-shrink-0 p-1 rounded-full hover:bg-stone-100 transition"
                  title="Remove query"
                  onClick={() => {
                    // delete query logic here
                  }}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        isOpen={!!selectedDeleteItem}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        item={selectedDeleteItem}
      />

      {/* Product details modal (for clicking item) */}
      {detailItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-lg animated-fade-in">
            <button
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-stone-100 transition"
              onClick={closeDetails}
            >
              <X className="w-4 h-4 text-stone-600" />
            </button>
            <h3 className="text-2xl mb-4 font-semibold text-stone-800">{detailItem.name}</h3>
            <img
              src={`http://localhost:3000/uploads/${detailItem.image}`}
              alt={detailItem.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="mb-4 text-stone-600">{detailItem.description}</p>
            <ul className="space-y-2 text-stone-700 text-sm">
              <li><strong>Category:</strong> {detailItem.category}</li>
              <li><strong>Price:</strong> ₹{detailItem.price}</li>
              <li><strong>Rating:</strong> {detailItem.rating}⭐</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
