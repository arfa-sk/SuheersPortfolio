import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/personal', label: 'Personal Info' },
    { to: '/hero', label: 'Hero Section' },
    { to: '/about', label: 'About' },
    { to: '/stats', label: 'Stats' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills' },
    { to: '/journey', label: 'Journey' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/contacts', label: 'Contacts' },
    { to: '/resume', label: 'Resume' },
    { to: '/settings', label: 'Site Settings', divider: true },
    { to: '/custom-sections', label: 'Custom Sections' },
];

export default function Layout() {
    const { logout } = useAuth();

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>SK<span className="accent">.</span> Admin</h2>
                </div>
                <nav className="sidebar-nav">
                    {links.map(l => (
                        <span key={l.to}>
                            {l.divider && <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '12px 0' }} />}
                            <NavLink to={l.to} end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                                {l.label}
                            </NavLink>
                        </span>
                    ))}
                </nav>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </aside>
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}
