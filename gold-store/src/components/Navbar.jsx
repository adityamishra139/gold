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
  }, [setUser]);

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
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Swarnaavya Logo" className="w-10 h-10 object-cover rounded-full" />
          <span className="text-2xl font-bold text-yellow-700">Swarnaavya</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
            Contact
          </NavLink>
          {user.isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>
              Admin
            </NavLink>
          )}
        </div>

        {/* Auth Controls */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative group">
              <button className="text-gray-700 font-medium hover:text-yellow-600 transition">
                Hi, {user.fname}
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 invisible group-hover:visible">
                {/* <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button> */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded hover:bg-yellow-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
