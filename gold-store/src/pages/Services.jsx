import {
  FaGem,
  FaExchangeAlt,
  FaBalanceScale,
  FaGift,
  FaShieldAlt,
  FaPiggyBank,
} from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Custom Jewelry Design",
      description:
        "Design your dream jewelry with our experts. From engagement rings to personal pendants, we bring your ideas to life.",
      icon: <FaGem className="text-amber-600 text-4xl" />,
    },
    {
      title: "Buyback & Exchange",
      description:
        "We offer fair buyback and exchange programs for your old gold items with instant valuation and hassle-free service.",
      icon: <FaExchangeAlt className="text-amber-600 text-4xl" />,
    },
    {
      title: "Purity Check",
      description:
        "Get your existing gold tested for purity using our advanced non-destructive technology with BIS standards.",
      icon: <FaBalanceScale className="text-amber-600 text-4xl" />,
    },
    {
      title: "Gifting & Packaging",
      description:
        "Beautiful packaging for festive and wedding occasions. Choose from a variety of elegant wrapping options.",
      icon: <FaGift className="text-amber-600 text-4xl" />,
    },
    {
      title: "Jewelry Insurance",
      description:
        "We offer optional insurance policies with every premium purchase to help you protect your most precious assets.",
      icon: <FaShieldAlt className="text-amber-600 text-4xl" />,
    },
    {
      title: "Gold Saving Schemes",
      description:
        "Start saving with us and earn monthly bonuses. Redeem your savings for jewelry or cash at the end of your term.",
      icon: <FaPiggyBank className="text-amber-600 text-4xl" />,
    },
  ];

  return (
    <div className="px-6 md:px-20 py-12 bg-gradient-to-br from-white to-amber-50 text-gold-900">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gold-200 shadow-sm hover:shadow-xl rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold text-amber-700 text-center mb-2">
              {service.title}
            </h3>
            <p className="text-gray-700 text-center">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-amber-100 py-10 px-6 rounded-xl shadow-inner">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">
          Need help choosing the right service?
        </h3>
        <p className="mb-6 text-gray-700">
          Talk to our gold advisors for free consultations and personalized suggestions.
        </p>
        <a href="/contact">
          <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-full transition">
            Talk to Us
          </button>
        </a>
      </div>
    </div>
  );
}
