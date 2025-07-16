import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms';
import { axiosInstance } from '../../axios';
import { Link } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/api/user/signup', {
        fname: formData.firstName,
        lname: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        setUser({
          id: res.data.user.id,
          fname: res.data.user.firstName,
          lname: res.data.user.lastName,
          email: res.data.user.email,
          isAdmin: res.data.user.isAdmin,
        });

        navigate('/');
      } else {
        setError(res.data.msg || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F2] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#E8DCCB] w-full max-w-md transition-all">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C1C]">Create Your Account</h1>
          <p className="text-sm text-[#8A7666] mt-2">Begin your golden journey ✨</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C]">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-[#D1BFA7] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C1C1C]">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-[#D1BFA7] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C1C1C]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border border-[#D1BFA7] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88900]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1C1C1C]">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#D1BFA7] rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B88900] pr-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-[#B88900] hover:underline focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-xl transition-all text-white ${
              loading
                ? 'bg-[#C6A55B] cursor-not-allowed'
                : 'bg-[#B88900] hover:bg-[#A07400]'
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#5F4B3B]">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#B88900] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
