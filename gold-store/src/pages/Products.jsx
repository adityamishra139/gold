import { useState, useEffect, useRef } from "react";
import { Star, X, ShoppingBag, Heart } from "lucide-react";
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

// Product Modal Component
function ProductModal({ product, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {/* Modal Content */}
        <div className="p-0">
          {/* Image Section */}
          <div className="relative h-80 bg-stone-50">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl"
            />
          </div>

          {/* Details Section */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-light text-stone-900 mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-stone-300 text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-stone-600">
                    ({product.rating}) • {Math.floor(Math.random() * 50) + 10} reviews
                  </span>
                </div>
              </div>
              <div className="text-right">
                {/* <p className="text-3xl font-light text-stone-900">
                  ${product.price}
                </p> */}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">Description</h3>
                <p className="text-stone-600 leading-relaxed">
                  {product.description || "Exquisitely crafted with attention to every detail, this piece represents the perfect blend of traditional artistry and contemporary elegance. Made from the finest materials with precision and care."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-2">Specifications</h4>
                  <div className="space-y-1 text-sm text-stone-600">
                    <div className="flex justify-between">
                      <span>Material:</span>
                      <span>22K Gold</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span>{(Math.random() * 10 + 5).toFixed(1)}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Purity:</span>
                      <span>BIS Hallmarked</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-stone-900 mb-2">Care Instructions</h4>
                  <ul className="space-y-1 text-sm text-stone-600">
                    <li>• Store in soft cloth pouch</li>
                    <li>• Avoid contact with chemicals</li>
                    <li>• Clean with soft brush</li>
                    <li>• Professional cleaning recommended</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-stone-200">
                
                <button className="w-12 h-12 border border-stone-300 hover:bg-stone-50 rounded-sm transition-colors flex items-center justify-center">
                  <Heart className="w-4 h-4 text-stone-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [jewel, setJewel] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [filtersRef, filtersVisible] = useScrollAnimation();
  const [productsRef, productsVisible] = useScrollAnimation();

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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
          cursor: pointer;
        }
        
        .luxury-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(139, 107, 93, 0.15);
        }
        
        .subtle-animation {
          animation: subtleFloat 8s ease-in-out infinite;
        }
        
        .refined-select {
          transition: all 0.3s ease;
        }
        
        .refined-select:focus {
          box-shadow: 0 0 0 2px rgba(139, 107, 93, 0.2);
          border-color: #8B6B5D;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-[50vh] flex flex-col justify-center bg-gradient-to-br from-stone-50 to-amber-50/30 px-8 pt-20 pb-16 relative"
      >
        <div 
          className={`max-w-4xl mx-auto text-center fade-in-up ${heroVisible ? 'visible' : ''}`}
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: '0.2s'
          }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-6 tracking-tight">
            Our <span className="text-stone-700 font-normal">Collection</span>
          </h1>
          
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Discover timeless pieces crafted with precision, passion, and the finest materials.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section 
        ref={filtersRef}
        className="py-12 px-8 bg-white border-b border-stone-200"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-6 fade-in-up ${filtersVisible ? 'visible' : ''}`}>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto border border-stone-300 rounded-sm px-4 py-3 bg-white text-stone-700 font-medium refined-select focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              {/* <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full sm:w-auto border border-stone-300 rounded-sm px-4 py-3 bg-white text-stone-700 font-medium refined-select focus:outline-none"
              >
                <option value="default">Sort: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select> */}
            </div>
            
            <div className="text-sm text-stone-600">
              Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section 
        ref={productsRef}
        className="py-20 px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((product, index) => (
              <div
                key={product.id}
                className={`luxury-hover fade-in-up ${productsVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="bg-stone-50 rounded-lg overflow-hidden border border-stone-200">
                  <div className="aspect-square bg-stone-100">
                    <img
                      src={`http://localhost:3000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-medium text-stone-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.round(product.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "fill-stone-300 text-stone-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-stone-500 ml-1">
                        ({product.rating})
                      </span>
                    </div>
                    {/* <p className="text-xl font-light text-stone-900">
                      ${product.price}
                    </p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-stone-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
