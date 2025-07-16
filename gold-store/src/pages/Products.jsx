import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { axiosInstance } from "../../axios";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "RING", label: "Rings" },
  { value: "NECKLACE", label: "Necklaces" },
  { value: "BRACELET", label: "Bracelets" },
  { value: "EARRING", label: "Earrings" },
  { value: "CHAIN", label: "Chains" },
  { value: "PENDANT", label: "Pendants" },
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
  }, []);

  const filtered = jewel
    .filter(
      (p) => selectedCategory === "all" || p.category === selectedCategory
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="px-4 md:px-10 py-10 bg-[#faf9f6] min-h-screen">
      <h1 className="text-4xl font-bold text-center text-[#1a1a1a] mb-10">
        Our <span className="text-yellow-600">Gold Collection</span>
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-auto border border-gray-300 rounded px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
          >
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-1 text-yellow-500 mb-3">
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
                <span className="text-sm text-gray-600 ml-1">
                  ({product.rating})
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
