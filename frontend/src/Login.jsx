import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Welcome back</h1>
          <p className="text-neutral-500 mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validate()}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
                  ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-neutral-300 focus:ring-neutral-200'}
                  focus:outline-none focus:ring-2 focus:border-transparent
                  placeholder:text-neutral-400`}
                placeholder="you@example.com"
                aria-invalid={errors.email ? 'true' : 'false'}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500 animate-slide-down" role="alert">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validate()}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200
                  ${errors.password ? 'border-red-400 focus:ring-red-200' : 'border-neutral-300 focus:ring-neutral-200'}
                  focus:outline-none focus:ring-2 focus:border-transparent
                  placeholder:text-neutral-400`}
                placeholder="••••••••"
                aria-invalid={errors.password ? 'true' : 'false'}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500 animate-slide-down" role="alert">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-neutral-900 text-white font-medium text-sm
                transition-all duration-200
                hover:bg-neutral-800 active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <a href="#" className="text-neutral-900 font-medium hover:underline">Create one</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slideDown 150ms ease-out; }
      `}</style>
    </div>
  );
}