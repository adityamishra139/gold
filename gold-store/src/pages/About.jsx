import { useState, useEffect, useRef } from "react";
import { FaGem, FaStar, FaHeart, FaShieldAlt, FaUsers, FaLeaf } from "react-icons/fa";
import pp from "../assets/rksharma.png";
import bgImage from "../assets/Interior.png"; // Replace with your actual image
import heroImage from "../assets/heroImage.png"
// Gentle scroll animation hook (from Home page)
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

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [storyRef, storyVisible] = useScrollAnimation();
  const [missionRef, missionVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();

  const values = [
    { name: "Purity First", icon: FaGem },
    { name: "Customer Centricity", icon: FaHeart },
    { name: "Craftsmanship", icon: FaStar },
    { name: "Trust & Transparency", icon: FaShieldAlt },
    { name: "Sustainability", icon: FaLeaf },
    { name: "Innovation", icon: FaUsers }
  ];

  const teamMembers = [
    { name: "Anjali Mehta", role: "Creative Director", img: pp },
    { name: "Rakesh Sharma", role: "Head Goldsmith", img: pp },
    { name: "Priya Verma", role: "Customer Experience Lead", img: pp },
  ];

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
      `}</style>

      {/* Hero Section */}
     

<section 
  ref={heroRef}
  className="min-h-[60vh] flex flex-col justify-center px-8 pt-20 pb-16 relative overflow-hidden"
>
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-60"
    style={{
      backgroundImage: `url(${bgImage})`
    }}
  />

  {/* Overlay for readability (optional) */}
  <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-amber-50/30 mix-blend-lighten"></div>

  {/* Text Content */}
  <div 
    className={`relative max-w-4xl mx-auto text-center fade-in-up ${heroVisible ? 'visible' : ''}`}
    style={{ 
      transform: `translateY(${scrollY * 0.05}px)`,
      animationDelay: '0.2s'
    }}
  >
    <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-6 tracking-tight">
      About <span className="text-stone-700 font-normal">Swarnaavya Jewels</span>
    </h1>
    
    <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
      A legacy of craftsmanship, trust, and timeless beauty spanning nearly three decades of excellence in fine jewelry.
    </p>
  </div>
</section>


      {/* Brand Story Section */}
      <section 
        ref={storyRef}
        className="py-20 px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`fade-in-up ${storyVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-light text-stone-900 mb-8">Our Story</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-stone-600 leading-relaxed">
                  Established in 1975, <span className="font-medium text-stone-800">Swarnaavya Jewels</span> we carry forward the legacy of <span className="font-medium text-stone-800">Annapurna Jewellers Pvt. Ltd.</span>, trusted since 1975 for quality, purity, and craftsmanship.

                </p>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Blending traditional artistry with modern elegance, we create timeless jewellery in silver, gold, and diamonds—each piece reflecting heritage, sophistication, and authenticity.

                  More than accessories, our jewellery is a celebration of identity and grace. Step into the world of Swarnaavya, where every design tells a story.
                </p>
              </div>
              <div className="w-full h-80 bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg border border-stone-200 flex items-center justify-center subtle-animation">
                 <img 
            src={heroImage} 
            alt="Swarnaavya showroom or product" 
            className="w-full h-full object-cover"
          />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section 
        ref={missionRef}
        className="py-20 bg-stone-50"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`fade-in-up ${missionVisible ? 'visible' : ''}`} style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-lg p-8 luxury-hover h-full">
                <div className="w-12 h-12 bg-stone-100 rounded-lg shadow-sm flex items-center justify-center mb-6">
                  <FaHeart className="text-xl text-stone-600" />
                </div>
                <h3 className="text-2xl font-light text-stone-900 mb-4">Our Mission</h3>
                <p className="text-stone-600 leading-relaxed">
                   To create timeless jewellery that celebrates life’s most meaningful moments.
                </p>
              </div>
            </div>

            <div className={`fade-in-up ${missionVisible ? 'visible' : ''}`} style={{ animationDelay: '0.4s' }}>
              <div className="bg-white rounded-lg p-8 luxury-hover h-full">
                <div className="w-12 h-12 bg-stone-100 rounded-lg shadow-sm flex items-center justify-center mb-6">
                  <FaStar className="text-xl text-stone-600" />
                </div>
                <h3 className="text-2xl font-light text-stone-900 mb-4">Our Vision</h3>
                <p className="text-stone-600 leading-relaxed">
                  To be Varanasi's most trusted jewellery house, blending heritage with innovation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section 
        ref={valuesRef}
        className="py-20 px-8 bg-white"
      >
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 fade-in-up ${valuesVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-light text-stone-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every piece we craft.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.name}
                className={`text-center fade-in-up ${valuesVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-stone-50 rounded-lg p-6 luxury-hover">
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-xl text-stone-600" />
                  </div>
                  <h4 className="font-medium text-stone-900">{value.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      {/* <section 
        ref={teamRef}
        className="py-20 bg-stone-50"
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className={`text-center mb-16 fade-in-up ${teamVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl font-light text-stone-900 mb-4">Meet Our Artisans</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              The passionate craftspeople and experts who bring your jewelry dreams to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name}
                className={`text-center fade-in-up ${teamVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-white rounded-lg p-8 luxury-hover">
                  <div className="relative mb-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-stone-100"
                    />
                  </div>
                  <h4 className="text-xl font-medium text-stone-900 mb-2">{member.name}</h4>
                  <p className="text-stone-600 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Heritage Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light text-stone-900 mb-6">Our Heritage</h2>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            From humble beginnings to becoming a trusted name in fine jewelry, our journey has been one of continuous learning, growth, and an unwavering commitment to excellence.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-light text-stone-900">1975</div>
              <div className="text-sm text-stone-600 uppercase tracking-wide">Founded</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-stone-900">10K+</div>
              <div className="text-sm text-stone-600 uppercase tracking-wide">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-light text-stone-900">50+</div>
              <div className="text-sm text-stone-600 uppercase tracking-wide">Years Excellence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
