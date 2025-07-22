import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import { axiosInstance } from "../../axios";

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!user?.id;
  const [message,setMessage] = useState({})

  const handleLogout = async (silent = false) => {
    try {
      await axiosInstance.get("/api/user/logout");
      if (!silent) 
      setMessage({"color" : "bg-green-400" , "message" : "Logged out successfully!"})
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser({ id: null, fname: "", lname: "", email: "", isAdmin: false });
      localStorage.removeItem("recoil-persist");
      navigate("/");
    }
  };

  setTimeout(()=>{
    setMessage({})
  },5000)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        if (res.data.success) {
          const { id, email, firstName, lastName, isAdmin } = res.data.user;
          setUser({ id, email, fname: firstName, lname: lastName, isAdmin });
        } else {
          throw new Error("Invalid session");
        }
      } catch {
        handleLogout(true); // silent logout
      }
    };

    if (!user?.id) {
      fetchUser();
    }
  }, [user?.id]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  if (user?.isAdmin) navItems.push({ path: "/admin", label: "Admin" });

  return (
    <nav className="sticky top-0 z-101 bg-white/95 backdrop-blur-sm border-b border-neutral-200 font-serif">
      <style jsx="true">{`
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

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <img src={logo} alt="Logo" className="w-12 h-12 rounded-full object-cover" />
          <span className="text-xl font-bold text-stone-900 tracking-tight group-hover:text-stone-800 transition">
            Swarnaavya
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-[15px] text-stone-700 font-medium">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `elegant-underline ${
                  isActive
                    ? "text-stone-900 font-semibold"
                    : "hover:text-stone-900 transition-colors"
                }`
              }
              end={path === "/"}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth area */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="text-sm text-stone-700 hover:text-stone-900 transition">
                Hi, {user.fname}
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border border-neutral-200 rounded shadow-sm opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                <button
                  onClick={() => handleLogout(false)}
                  className="block w-full px-4 py-2 text-left text-sm hover:bg-neutral-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-stone-900 text-white text-sm px-4 py-2 rounded-sm hover:bg-stone-800 refined-button"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-200 px-6 py-4 bg-white shadow-sm font-serif">
          <div className="flex flex-col gap-4 text-sm text-stone-700">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `elegant-underline ${
                    isActive
                      ? "text-stone-900 font-semibold"
                      : "hover:text-stone-900 transition-colors"
                  }`
                }
                end={path === "/"}
              >
                {label}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <>
                <span className="text-xs text-neutral-500">Hi, {user.fname}</span>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout(false);
                  }}
                  className="text-left text-red-600 text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/signin");
                }}
                className="bg-stone-900 text-white px-4 py-2 rounded-sm text-sm hover:bg-stone-800 refined-button"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
      {message.message && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 ${message.color} text-white px-6 py-3 rounded-md shadow-md z-50 transition-all duration-300`}>
          {message.message}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
