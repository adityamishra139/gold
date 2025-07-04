import { useState } from "react"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"

const allProducts = [
  {
    id: 1,
    name: "Classic Gold Ring",
    category: "rings",
    price: 1299,
    rating: 4.8,
    image: "/images/ring.jpg",
  },
  {
    id: 2,
    name: "Elegant Necklace",
    category: "necklaces",
    price: 2499,
    rating: 4.9,
    image: "/images/necklace.jpg",
  },
  {
    id: 3,
    name: "Solid Gold Bracelet",
    category: "bracelets",
    price: 1899,
    rating: 4.7,
    image: "/images/bracelet.jpg",
  },
  {
    id: 4,
    name: "Classic Hoop Earrings",
    category: "earrings",
    price: 999,
    rating: 4.6,
    image: "/images/earring.jpg",
  },
  {
    id: 5,
    name: "Heavy Gold Chain",
    category: "chains",
    price: 2799,
    rating: 4.9,
    image: "/images/chain.jpg",
  },
  {
    id: 6,
    name: "Heart Pendant",
    category: "pendants",
    price: 799,
    rating: 4.5,
    image: "/images/pendant.jpg",
  },
]

const categories = ["all", "rings", "necklaces", "bracelets", "earrings", "chains", "pendants"]

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOrder, setSortOrder] = useState("default")

  const filtered = allProducts
    .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price
      if (sortOrder === "high") return b.price - a.price
      if (sortOrder === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold text-amber-800 text-center mb-8">Our Gold Collection</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-amber-300 rounded px-4 py-2 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-amber-300 rounded px-4 py-2 focus:outline-none"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border border-amber-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover bg-amber-50"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-amber-700 mb-1">{product.name}</h2>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating) ? "fill-yellow-400" : "fill-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600">({product.rating})</span>
              </div>
              <p className="text-amber-700 font-bold text-lg mb-3">${product.price}</p>
              <Link to={`/products/${product.id}`}>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
