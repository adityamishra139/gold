import { useState } from 'react';
import { axiosInstance } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../atoms';

function SignIn() {
  const setUser = useSetRecoilState(userState);
const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/user/signin', {
        email: formData.email,
        password: formData.password
      });

      const userData = res.data.user;
      if (res.status === 200) {
        setUser({
          id: userData.id,
          fname: userData.firstName,
          lname: userData.lastName,
          email: userData.email,
          isAdmin: userData.isAdmin
        });
        navigate('/');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err?.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF9F2] flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg border border-[#E8DCCB] w-full max-w-md transition-all">
        {/* Logo or Brand Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1C1C1C]">Sign In to Your Account</h1>
          <p className="text-sm text-[#8A7666] mt-2">Luxury begins with your presence ✨</p>
        </div>

        {/* Error Box */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#5F4B3B]">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#B88900] hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
