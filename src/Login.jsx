import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
            } else {
                const registerData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.isAdmin ? 'admin' : 'user'
                };
                await register(registerData);
            }
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div style={{ marginBottom: '1rem' }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                    </div>
                )}
                
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                {!isLogin && (
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                                type="checkbox"
                                name="isAdmin"
                                checked={formData.isAdmin || false}
                                onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                            />
                            Register as Admin
                        </label>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
}

export default Login;