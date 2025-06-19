import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gold-700 leading-tight mb-4">
          Discover the Sparkle of Pure Elegance
        </h1>
        <p className="text-lg text-gold-800 mb-6 max-w-2xl mx-auto">
          Handcrafted gold jewelry that radiates tradition, trust, and timeless beauty.
        </p>
        <Link to="/products">
          <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-full font-semibold transition">
            Explore Our Collection
          </button>
        </Link>
      </section>

      {/* Categories Preview */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gold-800 mb-8 text-center">Explore Categories</h2>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {["Rings", "Necklaces", "Bracelets", "Earrings", "Chains", "Pendants"].map((category, i) => (
            <div
              key={i}
              className="bg-gold-100 rounded-lg text-center py-6 hover:shadow-lg transition border border-gold-200"
            >
              <img src="/images/category-icon.svg" alt={category} className="mx-auto h-12 mb-2" />
              <p className="font-medium text-gold-700">{category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gold-800 mb-8 text-center">Best Sellers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3].map((id) => (
            <div key={id} className="bg-white rounded-lg shadow-md border border-gold-100 p-4">
              <img
                src="/images/gold-jewelry-placeholder.png"
                alt="Gold Jewelry"
                className="w-full h-60 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gold-700">Gold Jewel #{id}</h3>
                <p className="text-sm text-gray-600">Beautiful handcrafted piece with intricate design.</p>
                <div className="mt-2 text-gold-600 font-bold text-lg">$1,299</div>
                <button className="mt-3 w-full bg-gold-500 hover:bg-gold-600 text-white py-2 rounded transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-gold-100 to-gold-50 rounded-xl p-10 text-center">
        <h2 className="text-3xl font-bold text-gold-800 mb-4">Celebrate Every Moment with Gold</h2>
        <p className="text-gold-700 mb-6">
          Explore a wide range of collections crafted to perfection just for you.
        </p>
        <Link to="/about">
          <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition">
            Learn About Us
          </button>
        </Link>
      </section>
    </div>
  )
}
