import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../axios";
import { useEffect } from "react";



const categories = [
  "all",
  "rings",
  "necklaces",
  "bracelets",
  "earrings",
  "chains",
  "pendants",
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [jewel, setJewel] = useState([]);

  useEffect(() => {
    const allProducts = async () => {
      try {
        const response = await axiosInstance.get("api/user/jewel");
        if (response.data.success) {
          setJewel(response.data.goldItem);
        }
      } catch (e) {
        console.log(e);
      }
    };
    allProducts();
  },[]);
  // const filtered = jewel
  //   .filter(
  //     (p) => selectedCategory === "all" || p.category === selectedCategory
  //   )
  //   .sort((a, b) => {
  //     if (sortOrder === "low") return a.price - b.price;
  //     if (sortOrder === "high") return b.price - a.price;
  //     if (sortOrder === "rating") return b.rating - a.rating;
  //     return 0;
  //   });

  return (
    <div className="px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold text-gold-800 text-center mb-8">
        Our Gold Collection
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gold-300 rounded px-4 py-2 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gold-300 rounded px-4 py-2 focus:outline-none"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jewel.map((product) => (
          <div
            key={product.id}
            className="border border-gold-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={`https://gold-1yxg.onrender.com/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-64 object-cover bg-gold-50"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gold-700 mb-1">
                {product.name}
              </h2>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-yellow-400"
                        : "fill-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600">
                  ({product.rating})
                </span>
              </div>
              <p className="text-gold-700 font-bold text-lg mb-3">
                ${product.price}
              </p>
              <Link to={`/products/${product.id}`}>
                <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-2 rounded transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
