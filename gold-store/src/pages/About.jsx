export default function About() {
  return (
    <div className="bg-gradient-to-b from-white to-amber-50 min-h-screen px-6 md:px-20 py-12 text-amber-900">
      <h1 className="text-4xl font-bold text-center mb-10">About Swarnaavya</h1>

      {/* Brand Story */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Established in 1995, <span className="font-semibold text-amber-800">Golden Store</span> has been a trusted name in fine jewelry for over two decades. 
          With a legacy rooted in craftsmanship and integrity, we specialize in pure gold ornaments that define luxury, tradition, and timelessness.
        </p>
        <p className="text-gray-700 mt-4 leading-relaxed">
          What began as a humble family-owned shop has now grown into a recognized destination for quality and trust. 
          Our customers come back not just for the purity of our gold, but for the warmth of our service.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-amber-700">Our Mission</h3>
          <p className="text-gray-700">
            To deliver exceptional gold products that celebrate heritage, beauty, and trust — empowering every customer to feel valued and royal.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-amber-100 shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-amber-700">Our Vision</h3>
          <p className="text-gray-700">
            To become India’s most loved and transparent gold brand by setting standards in purity, pricing, and personalization.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Core Values</h2>
        <ul className="grid md:grid-cols-3 gap-8 text-gray-700">
          {["Purity First", "Customer Centricity", "Craftsmanship", "Trust & Transparency", "Sustainability", "Innovation"].map((value, idx) => (
            <li key={idx} className="bg-amber-100 py-4 px-6 rounded-xl shadow hover:shadow-lg transition">
              <p className="font-medium text-center">{value}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Meet the Team */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[
            { name: "Anjali Mehta", role: "Creative Director", img: "/team/anjali.jpg" },
            { name: "Rakesh Sharma", role: "Head Goldsmith", img: "/team/rakesh.jpg" },
            { name: "Priya Verma", role: "Customer Experience Lead", img: "/team/priya.jpg" },
          ].map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-amber-100 shadow">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-semibold text-amber-800">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
