import { useState, useEffect, useRef } from "react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { axiosInstance } from "../../axios";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import bgImage from "../assets/getInTouch.webp"

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

export default function Contact() {
  const [user, setUser] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");
  const [scrollY, setScrollY] = useState(0);

  // Scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [contactRef, contactVisible] = useScrollAnimation();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        if (res.data.success) {
          const { email, firstName, lastName } = res.data.user;
          setUser({
            email,
            fname: firstName,
            lname: lastName
          });
          setFormData((prev) => ({
            ...prev,
            name: `${firstName} ${lastName}`,
            email
          }));
        }
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    if (!user?.email) fetchUser();
    else {
      setFormData((prev) => ({
        ...prev,
        name: `${user.fname} ${user.lname}`,
        email: user.email
      }));
    }
  }, [user, setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const res = await axiosInstance.post("/api/user/query", {
        name: formData.name,
        email: formData.email,
        query: formData.message,
      });

      if (res.data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          name: user.fname + " " + user.lname,
          email: user.email,
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending query:", err);
      setStatus("⚠️ Something went wrong. Try again.");
    }
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      value: "Swarnaavyajewels@gmail.com",
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8922029059",
      description: "Speak with our team"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Swarnaavya Jewels, D59/71 A-R, Mahmoorganj",
      description: "Varanasi, Uttar Pradesh – 221010"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Sat: 10:00 AM – 8:00 PM",
      description: "Sunday: Closed"
    }
  ];

  return (
    <div className="font-serif min-h-screen bg-white overflow-x-hidden">
      {/* Refined CSS with subtle, luxury animations (from Home page) */}
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
        
        .form-focus {
          transition: all 0.3s ease;
        }
        
        .form-focus:focus {
          box-shadow: 0 0 0 2px rgba(139, 107, 93, 0.2);
          border-color: #8B6B5D;
        }
      `}</style>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="min-h-[60vh] flex flex-col justify-center bg-gradient-to-br from-stone-50 to-amber-50/30 px-8 pt-20 pb-16 relative"
      >
        <div 
  className="absolute inset-0 bg-cover bg-center opacity-20 aspect-[16/9]"
  style={{
    backgroundImage: `url(${bgImage})`
  }}
/>

        <div 
          className={`max-w-4xl mx-auto text-center fade-in-up ${heroVisible ? 'visible' : ''}`}
          style={{ 
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: '0.2s'
          }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-stone-900 leading-tight mb-6 tracking-tight">
            Get in <span className="text-stone-700 font-normal">Touch</span>
          </h1>
          
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for any inquiries about our collections, custom pieces, or to schedule a private consultation.
          </p>
        </div>
      </section>

      {/* Contact Form & Details Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className={`fade-in-up ${formVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="bg-stone-50 rounded-lg p-8 luxury-hover">
                <h2 className="text-3xl font-light text-stone-900 mb-2">Send Us a Message</h2>
                <p className="text-stone-600 mb-8">We'll get back to you within 24 hours</p>

                {status && (
                  <div className={`mb-6 p-3 rounded-sm text-sm text-center font-medium ${
                    status.includes('✅') ? 'bg-green-50 text-green-700' :
                    status.includes('❌') ? 'bg-red-50 text-red-700' :
                    status.includes('⚠️') ? 'bg-yellow-50 text-yellow-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {status}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-stone-700 block mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-focus border-stone-200 focus:border-stone-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-stone-700 block mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-focus border-stone-200 focus:border-stone-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-stone-700 block mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className="form-focus border-stone-200 focus:border-stone-400 resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 rounded-sm transition-all duration-300 refined-button"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Details */}
            <div 
              ref={contactRef}
              className={`fade-in-up ${contactVisible ? 'visible' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="space-y-8 ">
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-stone-900 mb-4">Visit Our Showroom</h2>
                  <p className="text-lg text-stone-600 leading-relaxed">
                    Experience our collections in person at our elegant showroom, where our experts are ready to assist you in finding the perfect piece.
                  </p>
                </div>

                <div className="grid gap-8">
                  {contactDetails.map((detail, index) => (
                    <div 
                      key={detail.title}
                      className={`flex items-start gap-4 fade-in-up ${contactVisible ? 'visible' : ''}`}
                      style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 subtle-animation">
                        <detail.icon className="w-5 h-5 text-stone-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-stone-900 mb-1">{detail.title}</h4>
                        <p className="text-stone-800 font-medium mb-1">{detail.value}</p>
                        <p className="text-sm text-stone-600">{detail.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Information */}
                <div className={`mt-12 p-6 bg-stone-50 rounded-lg fade-in-up ${contactVisible ? 'visible' : ''}`} style={{ animationDelay: '1s' }}>
                  <h4 className="text-lg font-medium text-stone-900 mb-3">Private Consultations</h4>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    Book a private consultation with our jewelry experts to discuss custom designs, special occasions, or to explore our exclusive collections in a personalized setting.
                  </p>
                  <div className="text-sm text-stone-500">
                    <p>• One-on-one expert guidance</p>
                    <p>• Custom design consultation</p>
                    <p>• Private viewing of exclusive pieces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h3 className="text-2xl font-light text-stone-900 mb-4">Find Us</h3>
          <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
            Located in the heart of Mahmoorganj, Varanasi, our showroom offers a curated experience where tradition meets contemporary elegance.
          </p>
          
          {/* Placeholder for map or additional content */}
          <div className="w-full h-64 bg-stone-200 rounded-lg border border-stone-300 flex items-center justify-center">
            <div className="w-full h-64 bg-stone-200 rounded-lg border border-stone-300 overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57696.44104634142!2d82.95281809149974!3d25.33685602352073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e337594e66641%3A0x96c5cf2670d0d615!2sswarnaavya%20Jewels%20%E2%80%93%20Best%20Jewelry%20Store%20in%20Varanasi%2C%20Trusted%20Quality!5e0!3m2!1sen!2sin!4v1753167566079!5m2!1sen!2sin"
    className="w-full h-full"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
          </div>
        </div>
      </section>
    </div>
  );
}
