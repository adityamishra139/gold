import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from "../assets/logo.jpg" 

const Navbar = () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(user.id === null ? false:true); 

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
        } else {
          throw new Error("Invalid session");
        }
      } catch (e) {
        console.warn("Session expired or invalid. Logging out.");
        // Clear Recoil + localStorage
        setUser({
          id: null,
          fname: "",
          lname: "",
          email: "",
          isAdmin: false,
        });
        localStorage.removeItem("recoil-persist");
        setIsLoggedIn(false);
      }
    };

    getUser();
  }, [setUser, navigate]);

  const handleLogout = async() => {
    // Optionally call your /logout API if needed

    try{
      const res = await axiosInstance.get('/api/user/logout');
      if(!res.data.success)
      {
        alert("Error in logging out!!");
      }
      else{
        alert("Logged out successfully!!")
      }
    }
    catch(e)
    {
      console.log(e);
    }

    setUser({
      id: null,
      fname: "",
      lname: "",
      email: "",
      isAdmin: false,
    });
    localStorage.removeItem("recoil-persist");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => navigate("/signin");
  const handleProfile = () => navigate("/profile");

  return (
    <nav className="bg-gold-100 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand with Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Swarnaavya Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-2xl font-bold text-gold-700">Swarnaavya</span>
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 text-gold-800 font-medium">
          <NavLink to="/" end className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
         
          
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4 text-gold-800 font-medium">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleProfile}
                className="hover:underline transition duration-150"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-red-600 transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="hover:text-green-600 transition duration-150"
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
