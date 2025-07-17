import React, { useEffect, useState } from "react";
import { axiosInstance } from '../../axios';
import { Trash2 } from "lucide-react";

const CATEGORY_OPTIONS = [
  { label: "Ring", value: "ring" },
  { label: "Necklace", value: "necklace" },
  { label: "Bracelet", value: "bracelet" },
  { label: "Earring", value: "earring" },
  { label: "Pendant", value: "pendant" },
  { label: "Chain", value: "chain" },
];

export default function Admin() {
  const [item, setItem] = useState({
    name: "",
    category: "ring",
    price: "",
    rating: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [queries, setQueries] = useState([]);

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
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", item.name);
    formData.append("category", item.category);
    formData.append("price", item.price);
    formData.append("rating", item.rating);
    formData.append("image", imageFile);

    try {
      await axiosInstance.post("/api/admin/newItem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Item added successfully!");
      window.location.reload();
    } catch (err) {
      alert("Error submitting item.");
      console.error(err);
    }
  };

  const fetchQueries = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/queries", {
        withCredentials: true,
      });
      if (res.data.success) {
        setQueries(res.data.queries);
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
    }
  };

  const deleteQuery = async (id) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;
    try {
      await axiosInstance.delete(`/api/admin/queries/${id}`, {
        withCredentials: true,
      });
      setQueries((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Error deleting query:", err);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div>
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

          <select
            name="category"
            value={item.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

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

      {/* 👇 Display Queries Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">User Queries</h2>
        {queries.length === 0 ? (
          <p className="text-gray-500">No queries found.</p>
        ) : (
          <ul className="space-y-4">
            {queries.map((query) => (
              <li
                key={query.id}
                className="border p-4 rounded flex justify-between items-start gap-4"
              >
                <div>
                  <p className="font-semibold">{query.name}</p>
                  <p className="text-sm text-gray-600">{query.email}</p>
                  <p className="mt-1 text-gray-800">{query.query}</p>
                </div>
                <button
                  onClick={() => deleteQuery(query.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete Query"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
