import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    price: "",
    rating: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("price", item.price);
    formData.append("rating", item.rating);
    formData.append("image", imageFile); // append image file

    try {
      await axios.post("http://localhost:3000/gold/newItem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item added successfully!");
      window.location.reload();
    } catch (err) {
      alert("Error submitting item.");
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Add Gold Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={item.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={item.rating}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full p-2 border rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border mx-auto"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
