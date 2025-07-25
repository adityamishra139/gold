import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Services from "./pages/Services"; // ✅ Ensure this file exists
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"
import Admin from "./pages/Admin";
import { useState,useEffect } from "react";

function App() {
  const [isAdmin,setIsAdmin] = useState(false)
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axiosInstance.get("/api/user/me");
          if (res.data.success) {
            const { id, email, firstName, lastName, isAdmin } = res.data.user;
            setIsAdmin(isAdmin)
          } else {
            throw new Error("Invalid session");
          }
        } catch(e) {
          console.error(e);
        }
      };
  
      fetchUser();
    }, [],);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={isAdmin?<Admin />:<Navigate to="/"/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
