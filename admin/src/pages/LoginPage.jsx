import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch {
            setError('Invalid credentials');
        }
        setLoading(false);
    };

    return (
        <div className="login-wrapper">
            <div className="login-card card">
                <h1>SK<span className="accent">.</span> Admin</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-row">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p style={{ color: 'var(--danger)', fontSize: 14, marginBottom: 12 }}>{error}</p>}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
