import { Link } from "react-router-dom"
import {
  FaRing,
  FaGem,
  FaLink,
  FaStar,
  FaHeart,
  FaCrown,
} from "react-icons/fa"

export default function Home() {
  const categories = [
    { name: "Rings", icon: FaRing },
    { name: "Necklaces", icon: FaGem },
    { name: "Bracelets", icon: FaLink },
    { name: "Earrings", icon: FaStar },
    { name: "Chains", icon: FaLink },
    { name: "Pendants", icon: FaHeart },
  ]

  return (
    <div className="px-6 md:px-20 py-12 bg-gradient-to-b from-white to-amber-50 text-amber-900">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Discover the Sparkle of Pure Elegance
        </h1>
        <p className="text-lg text-amber-800 mb-6 max-w-2xl mx-auto">
          Handcrafted gold jewelry that radiates tradition, trust, and timeless beauty.
        </p>
        <Link to="/products">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold transition">
            Explore Our Collection
          </button>
        </Link>
      </section>

      {/* Categories Preview */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Explore Categories
        </h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <div
                key={i}
                className="bg-amber-100 border border-amber-200 rounded-lg text-center py-6 px-2 hover:shadow-lg transition"
              >
                <Icon className="mx-auto text-3xl text-amber-700 mb-2" />
                <p className="font-medium text-amber-800">{cat.name}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Best Sellers
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md border border-amber-100 p-4"
            >
              <img
                src="/images/gold-jewelry-placeholder.png"
                alt="Gold Jewelry"
                className="w-full h-60 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-amber-800">
                  Gold Jewel #{id}
                </h3>
                <p className="text-sm text-gray-600">
                  Beautiful handcrafted piece with intricate design.
                </p>
                <div className="mt-2 text-amber-700 font-bold text-lg">
                  ₹1,29,999
                </div>
                <button className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-amber-100 border border-amber-200 rounded-xl p-10 text-center shadow-inner">
        <h2 className="text-3xl font-bold text-amber-800 mb-4">
          Celebrate Every Moment with Gold
        </h2>
        <p className="text-amber-700 mb-6">
          Explore a wide range of collections crafted to perfection just for you.
        </p>
        <Link to="/about">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition">
            Learn About Us
          </button>
        </Link>
      </section>
    </div>
  )
}
