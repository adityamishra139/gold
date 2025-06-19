import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-gold-100 shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gold-700">GoldStore</Link>
        <div className="space-x-6 text-gold-800 font-medium">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
