import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../atoms";
import { axiosInstance } from "../../axios";

const Navbar = () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(user.id !== null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/api/user/me");
        if (res.data.success) {
          const data = res.data.user;
          setUser({
            id: data.id,
            email: data.email,
            fname: data.firstName,
            lname: data.lastName,
            isAdmin: data.isAdmin,
          });
          setIsLoggedIn(true);
        } else throw new Error("Invalid session");
      } catch (e) {
        console.warn("Session expired or invalid. Logging out.");
        setUser({ id: null, fname: "", lname: "", email: "", isAdmin: false });
        localStorage.removeItem("recoil-persist");
        setIsLoggedIn(false);
      }
    };
    getUser();
  }, [setUser, navigate]);

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.get("/api/user/logout");
      if (!res.data.success) alert("Error logging out!");
      else alert("Logged out successfully!");
    } catch (e) {
      console.log(e);
    }

    setUser({ id: null, fname: "", lname: "", email: "", isAdmin: false });
    localStorage.removeItem("recoil-persist");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/");
  };

  const handleLogin = () => {
    setMenuOpen(false);
    navigate("/signin");
  };

  const handleProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Swarnaavya Logo"
            className="w-10 h-10 object-cover rounded-full"
          />
          <span className="text-2xl font-bold text-yellow-700">Swarnaavya</span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl text-yellow-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/services", label: "Services" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 border-b-2 border-yellow-600 pb-1"
                  : "hover:text-yellow-700 transition"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-600 border-b-2 border-yellow-600 pb-1"
                  : "hover:text-yellow-700 transition"
              }
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 text-gray-700 font-medium">
          {isLoggedIn ? (
            <>
              <span className="font-medium text-yellow-700">Hi, {user.fname}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="text-green-700 hover:underline transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-5 text-gray-800 font-medium bg-white border-t shadow-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/services", label: "Services" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-600"
            >
              {link.label}
            </NavLink>
          ))}

          {user.isAdmin && (
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-600"
            >
              Admin
            </NavLink>
          )}

          {isLoggedIn ? (
            <>
              <span className="font-medium text-yellow-700">Hi, {user.fname}</span>
              <button
                onClick={handleProfile}
                className="text-left text-gray-700 hover:text-blue-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="text-left text-green-700 hover:underline"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
