import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaGem, FaRing, FaStar, FaHeart, FaShieldAlt, FaTruck
} from "react-icons/fa";
import heroImage from "../assets/Collection1.png"
import fadeImg from "../assets/logo2.png"

// Gentle scroll animation hook
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

// Refined counter component
function AnimatedNumber({ value, duration = 2000, isVisible }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const numericValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
    let startTime = null;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Gentle easing
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(easeOutCubic * numericValue));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration, isVisible]);

  const formatValue = (num) => {
    const suffix = value.includes('+') ? '+' : value.includes('%') ? '%' : '';
    if (num >= 1000) {
      return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K${suffix}`;
    }
    return `${num}${suffix}`;
  };
  
  return (
    <span className="tabular-nums">
      {formatValue(displayValue)}
    </span>
  );
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: "Engagement Rings", desc: "Celebrate love with our handcrafted engagement collection", price: "From $2,999", badge: "Most Popular" },
    { name: "Necklaces", desc: "Elegant necklaces that complement your natural beauty", price: "From $899" },
    { name: "Earrings", desc: "Timeless earrings for every special occasion", price: "From $599", badge: "New Collection" }
  ];
  
  const stats = [
    { value: "50+", label: "Years of Excellence" },
    { value: "10K+", label: "Satisfied Customers" },
    { value: "100%", label: "Authentic Pieces" }
  ];
  
  const features = [
    { icon: FaStar, title: "Master Craftsmanship", desc: "Each piece is meticulously crafted by skilled artisans with decades of experience" },
    { icon: FaShieldAlt, title: "Lifetime Assurance", desc: "Comprehensive warranty and complimentary maintenance for all jewelry" },
    { icon: FaGem, title: "Certified Authenticity", desc: "Every diamond and gemstone comes with certified authenticity documentation" },
    { icon: FaTruck, title: "Secure Delivery", desc: "Complimentary insured shipping with premium packaging worldwide" }
  ];

  const [heroRef, heroVisible] = useScrollAnimation();
  const [featuresRef, featuresVisible] = useScrollAnimation();
  const [collectionRef, collectionVisible] = useScrollAnimation();

  return (
    <div className="font-serif min-h-screen bg-white overflow-x-hidden">
      {/* Refined CSS with subtle, luxury animations */}
      <style jsx global>{`
        @keyframes gentleFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes elegantGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(139, 107, 93, 0.1); }
          50% { box-shadow: 0 8px 30px rgba(139, 107, 93, 0.15); }
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .luxury-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .luxury-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(139, 107, 93, 0.15);
        }
        
        .subtle-animation {
          animation: subtleFloat 8s ease-in-out infinite;
        }
        
        .number-elegance {
          transition: all 0.3s ease;
        }
        
        .number-elegance:hover {
          color: #8B6B5D;
          transform: scale(1.02);
        }
        
        .refined-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .refined-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .refined-button:hover::before {
          left: 100%;
        }
        
        .elegant-underline {
          position: relative;
        }
        
        .elegant-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 1px;
          background: #8B6B5D;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .elegant-underline:hover::after {
          width: 100%;
        }
      `}</style>


      {/* Hero Section - Refined and Elegant */}
      <section 
        ref={heroRef}
        className="min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-br from-stone-50 to-amber-50/30 px-8 pt-0 pb-8 relative"
      >
        <img 
    src={fadeImg} 
    alt="Background" 
    className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none select-none z-0"
  />
        <div 
          className={`flex-1 max-w-2xl fade-in-up ${heroVisible ? 'visible' : ''}`}
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: '0.2s'
          }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-6 tracking-tight">
            Timeless Elegance in{' '}
            <span className="text-stone-700 font-normal">Every Piece</span>
          </h1>
          
          <p className="text-lg text-stone-600 max-w-lg mb-10 leading-relaxed">
            Discover our collection of handcrafted jewelry, where each piece tells a story of heritage, artistry, and timeless beauty.
          </p>
          
          <div className="flex gap-4 flex-wrap mb-12">
            <Link 
              to="/products" 
              className="bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-3 rounded-sm transition-all duration-300 refined-button"
            >
              Explore Collection
            </Link>
            <Link 
              to="/contact" 
              className="border border-stone-300 text-stone-700 font-medium px-8 py-3 rounded-sm hover:bg-stone-50 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
          
          {/* Elegant Stats */}
          <div className="flex gap-12 mt-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`text-center fade-in-up ${heroVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="text-2xl font-light text-stone-900 mb-1 number-elegance">
                  <AnimatedNumber value={stat.value} isVisible={heroVisible} />
                </div>
                <div className="text-xs text-stone-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hero Image - Subtle Animation */}
        <div className="flex-1 flex justify-center mt-12 md:mt-0">
  <div className="w-80 h-80 rounded-lg border border-stone-200 shadow-lg overflow-hidden z-100">
    <img 
      src={heroImage} 
      alt="Heritage Collection" 
      className="w-full h-full object-cover"
    />
  </div>
</div>

        
        {/* Refined Rating Card */}
        <div 
          className={`absolute left-1/2 bottom-8 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-6 py-3 flex items-center gap-3 fade-in-up ${heroVisible ? 'visible' : ''}`}
          style={{ animationDelay: '0.8s' }}
        >
          <span className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
          </span>
          <span className="font-medium text-stone-900">5.0</span>
          <span className="text-stone-500 text-sm">16 reviews</span>
        </div>
      </section>

      {/* Featured Collections - Refined Cards */}
      <section 
        ref={collectionRef}
        className="py-20 px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 fade-in-up ${collectionVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-light text-stone-900 mb-4">Featured Collections</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Explore our carefully curated pieces, each designed to celebrate life's most precious moments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((collection, idx) => (
              <div 
              key={collection.name}
              className={`bg-stone-50 rounded-lg p-8 luxury-hover fade-in-up ${collectionVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${idx * 0.2}s` }}
              >
                {collection.badge && (
                  <span className="inline-block mb-4 text-xs bg-stone-200 text-stone-700 px-3 py-1 rounded-full uppercase tracking-wide">
                    {collection.badge}
                  </span>
                )}
                
                <h3 className="font-light text-xl text-stone-900 mb-3">{collection.name}</h3>
                <p className="text-stone-600 leading-relaxed mb-4">{collection.desc}</p>
                <div className="font-medium text-stone-800 mb-4">{collection.price}</div>
                <Link 
                  to={`/collections/${collection.name.toLowerCase().replace(/ /g, '-')}`}
                  className="text-stone-700 font-medium hover:text-stone-900 transition-colors elegant-underline inline-flex items-center gap-2"
                >
                  View Collection
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions - Clean & Minimal */}
      <section 
        ref={featuresRef}
        className="py-20 bg-stone-50"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className={`text-center mb-16 fade-in-up ${featuresVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-light text-stone-900 mb-4">Our Promise to You</h2>
            <p className="text-lg text-stone-600 max-w-3xl mx-auto">
              Every piece is crafted with dedication to excellence, ensuring you receive jewelry that lasts a lifetime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`text-center fade-in-up ${featuresVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-xl text-stone-600" />
                </div>
                <h3 className="font-medium text-lg text-stone-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-2xl font-light mb-4">Stay Connected</h2>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Be the first to discover new collections, exclusive events, and stories of craftsmanship.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 bg-white text-stone-900 rounded-l-sm focus:outline-none"
            />
            <button className="bg-stone-700 hover:bg-stone-600 px-6 py-3 rounded-r-sm transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}