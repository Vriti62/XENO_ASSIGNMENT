import axios from 'axios';
import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    store_name: '',
    user_email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        onLogin(response.data.user || formData);
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-primary">Shopify Analytics</h1>
          <p className="text-muted-foreground">
            Sign in to view your store analytics
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="store_name" className="block text-sm font-medium mb-2">
              Store Name
            </label>
            <input
              type="text"
              id="store_name"
              name="store_name"
              value={formData.store_name}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="user_email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
