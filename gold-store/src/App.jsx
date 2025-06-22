import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Services from "./pages/Services"; // ✅ Ensure this file exists
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
<<<<<<< HEAD
import Admin from "./pages/Admin";
=======
import Profile from "./pages/Profile"
>>>>>>> 1ab42d3e105757b6914f6041c595460797a88c83

function App() {
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
<<<<<<< HEAD
                <Route path="/admin" element={<Admin />} />

=======
        <Route path="/profile" element={<Profile />} />
        
>>>>>>> 1ab42d3e105757b6914f6041c595460797a88c83
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
