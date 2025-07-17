import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/logo.jpg";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms";
import { axiosInstance } from "../../axios";

const Navbar = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const isLoggedIn = !!user?.id;

  const handleLogout = async (silent = false) => {
    try {
      await axiosInstance.get("/api/user/logout");
      if (!silent) alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout failed:", err);
      if (!silent) alert("Logout error");
    } finally {
      setUser({ id: null, fname: "", lname: "", email: "", isAdmin: false });
      localStorage.removeItem("recoil-persist");
      navigate("/");
    }
  };

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
      } catch (err) {
        console.warn("Session invalid. Logging out.");
        handleLogout(true); // silent logout
      }
    };

    if (!user?.id) {
      fetchUser();
    }
  }, [user?.id]); // setUser is stable from Recoil, no need to include in deps


  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Swarnaavya Logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="text-2xl font-bold text-yellow-700">Swarnaavya</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/" end className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>Products</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>Services</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>Contact</NavLink>
          {user?.isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => isActive ? "text-yellow-600 border-b-2 border-yellow-600 pb-1" : "hover:text-yellow-700 transition"}>Admin</NavLink>
          )}
        </div>

        {/* Auth buttons */}
        <div className="relative">
          {isLoggedIn ? (
            <div className="group relative inline-block">
              <button className="text-gray-700 font-medium hover:text-yellow-600 transition">
                Hi, {user.fname}
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                <button
                  onClick={() => handleLogout(false)}
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

