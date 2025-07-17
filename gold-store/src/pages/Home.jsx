import { Link } from "react-router-dom";
import {
  FaRing,
  FaGem,
  FaLink,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import mostSelling from "../assets/mostSelling.webp"

export default function Home() {
  const categories = [
    { name: "Rings", icon: FaRing },
    { name: "Necklaces", icon: FaGem },
    { name: "Bracelets", icon: FaLink },
    { name: "Earrings", icon: FaStar },
    { name: "Chains", icon: FaLink },
    { name: "Pendants", icon: FaHeart },
  ];

  return (
    <div className="text-amber-900">

      {/* Hero Section */}
      <section className="bg-amber-50 px-6 md:px-20 py-20 text-center">
        <FadeInWhenVisible>
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
        </FadeInWhenVisible>
      </section>

      {/* Story */}
      <FadeInWhenVisible>
        <div className="bg-white text-center px-6 md:px-40 py-12 text-amber-800 text-lg font-medium">
          Every piece we craft tells a story — of heritage, elegance, and craftsmanship passed down through generations.
        </div>
      </FadeInWhenVisible>

      {/* Categories Preview */}
      <section className="bg-amber-100 px-6 md:px-20 py-20">
        <FadeInWhenVisible>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div
                  key={i}
                  className="bg-white border border-amber-200 rounded-lg text-center py-6 px-2 hover:shadow-md transition"
                >
                  <Icon className="mx-auto text-3xl text-amber-700 mb-2" />
                  <p className="font-medium text-amber-800">{cat.name}</p>
                </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Story */}
      <FadeInWhenVisible>
        <div className="bg-white text-center px-6 md:px-40 py-12 text-amber-800">
          Whether it’s a delicate ring or a bold pendant, our designs suit every moment — from everyday wear to grand celebrations.
        </div>
      </FadeInWhenVisible>

      {/* Featured Highlights */}
      <section className="bg-amber-200 px-6 md:px-20 py-20">
        <FadeInWhenVisible>
          <h2 className="text-2xl font-semibold mb-8 text-center">
            What Makes Us Shine
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "100% Real Gold",
                text: "Certified purity with complete transparency and BIS hallmark.",
              },
              {
                title: "Handcrafted Beauty",
                text: "Designed by skilled artisans with passion in every detail.",
              },
              {
                title: "Trusted Legacy",
                text: "Decades of excellence, trust, and returning customers worldwide.",
              },
            ].map((item, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1}>
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-amber-800">{item.text}</p>
              </div>
            </FadeInWhenVisible>
            ))}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Story */}
      <FadeInWhenVisible>
        <div className="bg-white text-center px-6 md:px-40 py-12 text-amber-800">
          Trust is at the heart of what we do. Our promise is purity, and our passion is excellence.
        </div>
      </FadeInWhenVisible>

      {/* Best Sellers */}
      <section className="bg-amber-50 px-6 md:px-20 py-20">
        <FadeInWhenVisible>
          <h2 className="text-2xl font-semibold text-center mb-8">
            Best Sellers
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((id,i) => (
              <FadeInWhenVisible key={id} delay={i * 0.2}>

              <div
                key={id}
                className="bg-white rounded-xl shadow-md border border-amber-100 p-4"
              >
                <img
                  src={mostSelling}
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
            </FadeInWhenVisible>
            ))}
          </div>
            </FadeInWhenVisible>
      </section>

      {/* Story */}
      <FadeInWhenVisible>
        <div className="bg-white text-center px-6 md:px-40 py-12 text-amber-800">
          Loved by thousands, our best sellers reflect the timeless charm of Indian craftsmanship.
        </div>
      </FadeInWhenVisible>

      {/* Testimonials */}
      <section className="bg-amber-100 px-6 md:px-20 py-20 text-center">
        <FadeInWhenVisible>
          <h2 className="text-2xl font-semibold mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Absolutely loved the pendant!",
              "Incredible detail and quality.",
              "It made our anniversary special.",
            ].map((quote, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-6 shadow-md text-amber-800"
              >
                <p className="italic">“{quote}”</p>
                <div className="mt-4 font-bold text-sm">— Happy Customer</div>
              </div>
            ))}
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Story */}
      <FadeInWhenVisible>
        <div className="bg-white text-center px-6 md:px-40 py-12 text-amber-800">
          We don't just sell jewelry. We craft lifelong memories.
        </div>
      </FadeInWhenVisible>

      {/* CTA Banner / Newsletter */}
      <section className="bg-amber-600 text-white px-6 md:px-20 py-20 text-center rounded-t-3xl">
        <FadeInWhenVisible>
          <h2 className="text-3xl font-bold mb-4">
            Join Our Golden Circle
          </h2>
          <p className="mb-6 max-w-xl mx-auto">
            Be the first to know about new collections, exclusive offers, and artisan stories.
          </p>
          <Link to="/about">
            <button className="bg-white text-amber-700 font-semibold px-8 py-3 rounded-full hover:bg-amber-100 transition">
              Learn About Us
            </button>
          </Link>
        </FadeInWhenVisible>
      </section>
    </div>
  );
}
