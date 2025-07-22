import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaGem,
  FaStar,
  FaShieldAlt,
  FaTruck
} from "react-icons/fa";

import heroImage from "../assets/Collection1.png";
import fadeImg   from "../assets/logo2.png";

/* ────────────────────────────────
   Helpers
   ────────────────────────────────*/

// 1.  Intersection-observer reveal
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, isVisible];
}

// 2. Animated counter
function AnimatedNumber({ value, duration = 2_000, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const target = parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
    let start = null;

    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - progress, 3);    
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration, isVisible]);

  const suffix = value.endsWith("+") ? "+" : value.endsWith("%") ? "%" : "";
  const formatted =
    count >= 1_000 ? `${(count / 1_000).toFixed(count % 1_000 ? 1 : 0)}K` : count;

  return <span className="tabular-nums">{formatted}{suffix}</span>;
}

/* ────────────────────────────────
   Main component
   ────────────────────────────────*/

export default function Home() {
  /* ─ State for parallax offset ─ */
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─ Static data ─ */
  const stats = [
    { value: "50+",   label: "Years of Excellence" },
    { value: "100K+",  label: "Satisfied Customers" },
    { value: "100%",  label: "Authentic Pieces"    },
  ];

  const collections = [
    {
      name: "Engagement Rings",
      desc: "Celebrate love with our handcrafted engagement collection",
      badge: "Most Popular"
    },
    {
      name: "Necklaces",
      desc: "Elegant necklaces that complement your natural beauty"
    },
    {
      name: "Earrings",
      desc: "Timeless earrings for every special occasion",
      badge: "New Collection"
    }
  ];

  const features = [
    { icon: FaStar,      title: "Master Craftsmanship",   desc: "Meticulously crafted by artisans with decades of experience" },
    { icon: FaShieldAlt, title: "Lifetime Assurance",     desc: "Comprehensive warranty and complimentary maintenance" },
    { icon: FaGem,       title: "Certified Authenticity", desc: "Every diamond and gemstone comes with certification" },
    { icon: FaTruck,     title: "Secure Delivery",        desc: "Complimentary insured shipping worldwide" }
  ];

  const testimonials = [
    {
      quote: "The engagement ring I purchased exceeded all expectations. My fiancée was speechless.",
      customer: "Rahul M.",
      city: "Mumbai"
    },
    {
      quote: "Every piece I've bought over the years has been exceptional. Unmatched quality and service.",
      customer: "Priya S.",
      city: "Delhi"
    },
    {
      quote: "The necklace for my mother's birthday was perfect. Elegant packaging made it truly special.",
      customer: "Arun K.",
      city: "Bengaluru"
    }
  ];

  /* ─ Animation refs ─ */
  const [heroRef,         heroVisible]         = useScrollAnimation();
  const [collectionRef,   collectionVisible]   = useScrollAnimation();
  const [featuresRef,     featuresVisible]     = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();

  /* ───────────────────────────── */

  return (
    <div className="font-serif min-h-screen bg-white overflow-x-hidden">

      {/* ---------- Global animation / utility styles ---------- */}
      <style jsx global>{`
        @keyframes fadeUp { 0% {opacity:0;transform:translateY(30px)} 100% {opacity:1;transform:translateY(0)} }
        .fade-up     { opacity:0; transform:translateY(30px); }
        .fade-up.on  { animation:fadeUp .8s cubic-bezier(.4,0,.2,1) forwards; }
        .lux-hover   { transition:transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s; }
        .lux-hover:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(139,107,93,.15); }
        .btn-effect  { position:relative; overflow:hidden; }
        .btn-effect::before {
          content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transition:left .5s;
        }
        .btn-effect:hover::before { left:100%; }
      `}</style>

      {/* ========== Hero Section ========== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50/30 px-8 py-14">
        {/* Faded background logo */}
        <img
          src={fadeImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none"
        />

        {/* Text column */}
        <div
          className={`flex-1 max-w-xl fade-up ${heroVisible ? "on" : ""}`}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-6">
            Timeless Elegance in{" "}
            <span className="text-stone-700 font-normal">Every Piece</span>
          </h1>

          <p className="text-lg text-stone-600 mb-10 leading-relaxed">
            Discover our handcrafted collection where each jewel tells a story
            of heritage, artistry, and enduring beauty.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/products"
              className="btn-effect bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-3 rounded-sm"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="border border-stone-300 text-stone-700 font-medium px-8 py-3 rounded-sm hover:bg-stone-50"
            >
              Book Appointment
            </Link>
          </div>

          {/* Counters */}
          <div className="flex gap-12">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-light text-stone-900 mb-1">
                  <AnimatedNumber value={s.value} isVisible={heroVisible} />
                </div>
                <div className="text-xs text-stone-600 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center mb-12 md:mb-0">
          <div className="z-100 w-80 h-80 rounded-lg border border-stone-200 shadow-lg overflow-hidden">
            <img
              src={heroImage}
              alt="Highlight piece"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========== Featured Collections ========== */}
      <section ref={collectionRef} className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light text-stone-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-stone-600 mb-16">
            Curated pieces, crafted for life's most precious moments.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {collections.map((c, i) => (
              <div
                key={c.name}
                className={`lux-hover fade-up ${collectionVisible ? "on" : ""}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="bg-stone-50 p-8 rounded-lg border border-stone-200 h-full">
                  {c.badge && (
                    <span className="inline-block mb-4 text-xs bg-stone-200 text-stone-700 px-3 py-1 rounded-full uppercase">
                      {c.badge}
                    </span>
                  )}
                  <h3 className="font-light text-xl text-stone-900 mb-3">
                    {c.name}
                  </h3>
                  <p className="text-stone-600 mb-6">{c.desc}</p>
                  <Link
                    to={`/collections/${c.name.toLowerCase().replace(/ /g, "-")}`}
                    className="elegant-underline text-stone-700 hover:text-stone-900"
                  >
                    View Collection →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Features ========== */}
      <section ref={featuresRef} className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light text-stone-900 mb-4">
            Our Promise to You
          </h2>
          <p className="text-lg text-stone-600 mb-16 max-w-3xl mx-auto">
            Every piece is crafted with dedication to excellence, ensuring a
            lifetime of beauty.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`fade-up ${featuresVisible ? "on" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <f.icon className="text-xl text-stone-600" />
                </div>
                <h3 className="font-medium text-lg text-stone-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-stone-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Testimonials ========== */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light text-stone-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-stone-600 mb-16">
            Real stories from people who cherish our craftsmanship.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.customer}
                className={`bg-stone-50 p-8 rounded-lg lux-hover fade-up ${
                  testimonialsVisible ? "on" : ""
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className="text-sm" />
                  ))}
                </div>
                <p className="italic text-stone-600 mb-6 leading-relaxed">
                  “{t.quote}”
                </p>
                <div className="text-right">
                  <div className="font-medium text-stone-900">{t.customer}</div>
                  <div className="text-sm text-stone-500">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Newsletter ========== */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-2xl font-light mb-4">Stay Connected</h2>
          <p className="text-stone-300 mb-8">
            Be the first to discover new collections, exclusive events, and
            stories of craftsmanship.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white text-stone-900 rounded-l-sm focus:outline-none"
            />
            <button className="btn-effect bg-stone-700 hover:bg-stone-600 px-6 py-3 rounded-r-sm text-white">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
